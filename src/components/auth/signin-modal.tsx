'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

import { useAuth } from './auth-context';

interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SigninModal({ isOpen, onClose }: SigninModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { signIn, signUp, isLoading } = useAuth();
  
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setPasswordError('');
    }
  }, [isOpen]);

  // GSAP animations for form elements
  useEffect(() => {
    if (isOpen && formRef.current) {
      const inputs = formRef.current.querySelectorAll('input, button');
      gsap.fromTo(inputs, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.3, 
          stagger: 0.1,
          ease: "power2.out" 
        }
      );
    }
  }, [isOpen, isSignUp]);

  // Title animation when switching between signin/signup
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isSignUp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (!name || !email || !password || !confirmPassword) return;
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
      
      try {
        await signUp({
          name,
          email,
          password,
          password_confirmation: confirmPassword
        });
        onClose();
      } catch {
        // Error is handled in the auth context
      }
    } else {
      if (!email || !password) return;
      
      try {
        await signIn({ email, password });
        onClose();
      } catch {
        // Error is handled in the auth context
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  return ( 
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-[90vw] w-full mx-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fixed">
        <DialogHeader>
          <DialogTitle ref={titleRef} className="text-center text-lg sm:text-xl font-semibold">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </DialogTitle>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          {isSignUp && (
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="name" className="text-xs sm:text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-9 sm:h-10"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="email" className="text-xs sm:text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-9 sm:h-10"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="password" className="text-xs sm:text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className="pl-10 pr-10 h-9 sm:h-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="confirmPassword" className="text-xs sm:text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className={`pl-10 h-9 sm:h-10 ${passwordError ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-9 sm:h-10 mt-4 sm:mt-6"
            disabled={
              isLoading || 
              !email || 
              !password || 
              (isSignUp && (!name || !confirmPassword || password !== confirmPassword))
            }
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span className="text-xs sm:text-sm">{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
              </div>
            ) : (
              <span className="text-xs sm:text-sm">{isSignUp ? 'Create Account' : 'Sign In'}</span>
            )}
          </Button>

          <div className="text-center pt-2 sm:pt-4">
            <button
              type="button"
              onClick={toggleMode}
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isSignUp ? (
                <>Already have an account? <span className="font-medium text-primary">Sign In</span></>
              ) : (
                <>Don&apos;t have an account? <span className="font-medium text-primary">Sign Up</span></>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}