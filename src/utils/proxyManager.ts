import { supabase } from "@/integrations/supabase/client";

interface Proxy {
  ip: string;
  port: number;
  protocol: string;
  isValid?: boolean;
  lastChecked?: Date;
}

interface ProxyValidationResult {
  isValid: boolean;
  responseTime?: number;
}

export class ProxyManager {
  private static proxyList: Proxy[] = [];
  private static currentProxyIndex = 0;
  private static lastProxyUpdate: Date | null = null;
  private static readonly UPDATE_INTERVAL = 1000 * 60 * 30; // 30 minutes

  private static readonly USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.59'
  ];

  static async initialize(): Promise<void> {
    console.log('Initializing proxy manager');
    await this.updateProxyList();
  }

  static async updateProxyList(): Promise<void> {
    try {
      console.log('Fetching new proxy list');
      const response = await fetch('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all');
      const text = await response.text();
      
      const proxies: Proxy[] = text.split('\n')
        .filter(line => line.includes(':'))
        .map(line => {
          const [ip, port] = line.split(':');
          return {
            ip: ip.trim(),
            port: parseInt(port.trim()),
            protocol: 'http',
            isValid: false,
            lastChecked: new Date()
          };
        });

      console.log(`Found ${proxies.length} potential proxies`);
      this.proxyList = [];
      
      // Validate proxies in parallel with a limit
      const validationPromises = proxies.slice(0, 10).map(proxy => this.validateProxy(proxy));
      const validatedProxies = await Promise.all(validationPromises);
      
      this.proxyList = validatedProxies.filter(proxy => proxy.isValid);
      this.lastProxyUpdate = new Date();
      
      console.log(`Validated ${this.proxyList.length} working proxies`);
    } catch (error) {
      console.error('Error updating proxy list:', error);
      throw new Error('Failed to update proxy list');
    }
  }

  private static async validateProxy(proxy: Proxy): Promise<Proxy> {
    try {
      console.log(`Validating proxy: ${proxy.ip}:${proxy.port}`);
      
      const { data, error } = await supabase.functions.invoke('validate-proxy', {
        body: {
          proxy: {
            ...proxy,
            userAgent: this.getRandomUserAgent()
          }
        }
      });

      if (error) {
        console.error('Proxy validation failed:', error);
        proxy.isValid = false;
        return proxy;
      }

      proxy.isValid = data.isValid;
      proxy.lastChecked = new Date();
      
      console.log(`Proxy ${proxy.ip}:${proxy.port} validation result:`, data.isValid);
    } catch (error) {
      console.error(`Proxy ${proxy.ip}:${proxy.port} validation failed:`, error);
      proxy.isValid = false;
    }
    return proxy;
  }

  static async getProxy(): Promise<Proxy | null> {
    if (!this.proxyList.length || 
        !this.lastProxyUpdate || 
        Date.now() - this.lastProxyUpdate.getTime() > this.UPDATE_INTERVAL) {
      await this.updateProxyList();
    }

    if (!this.proxyList.length) {
      console.warn('No valid proxies available');
      return null;
    }

    this.currentProxyIndex = (this.currentProxyIndex + 1) % this.proxyList.length;
    return this.proxyList[this.currentProxyIndex];
  }

  static getRandomUserAgent(): string {
    return this.USER_AGENTS[Math.floor(Math.random() * this.USER_AGENTS.length)];
  }
}