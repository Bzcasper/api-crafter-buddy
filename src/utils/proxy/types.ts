export interface Proxy {
  ip: string;
  port: number;
  protocol: string;
  isValid?: boolean;
  lastChecked?: Date;
}

export interface ProxyValidationResult {
  isValid: boolean;
  responseTime?: number;
}