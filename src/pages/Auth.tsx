import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent, type: 'login' | 'signup') => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(`Attempting to ${type} with email:`, email);
      
      if (type === 'signup') {
        // Attempt signup
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              email: email,
            }
          }
        });

        console.log('Signup response:', { signUpData, signUpError });

        if (signUpError) {
          if (signUpError.message.includes('User already registered')) {
            toast({
              title: "Error",
              description: "An account with this email already exists. Please log in instead.",
              variant: "destructive",
            });
            setLoading(false);
            return;
          }
          throw signUpError;
        }

        if (signUpData.user) {
          // Create profile record
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([{ 
              id: signUpData.user.id, 
              email: email 
            }]);

          if (profileError) {
            console.error('Profile creation error:', profileError);
            throw new Error('Failed to create user profile');
          }

          toast({
            title: "Success",
            description: "Account created successfully! Please check your email for verification.",
          });
        }
      } else {
        // Login flow
        const { data, error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });

        console.log('Login response:', { data, error });

        if (error) {
          if (error.message.includes('Email not confirmed')) {
            toast({
              title: "Error",
              description: "Please verify your email before logging in.",
              variant: "destructive",
            });
          } else if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Error",
              description: "Invalid email or password. Please try again.",
              variant: "destructive",
            });
          } else {
            throw error;
          }
          return;
        }

        if (data.session) {
          console.log('Login successful, redirecting...');
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleAuth(e, 'login')} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={loading}
                onClick={(e) => handleAuth(e, 'signup')}
              >
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;