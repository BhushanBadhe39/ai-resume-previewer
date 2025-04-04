
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("resumeUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, you would validate against a backend
      // For this demo, we'll use mock validation
      if (email && password) {
        // Check if user exists in local storage (for registration)
        const storedUsers = localStorage.getItem("resumeUsers");
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        const foundUser = users.find((u: any) => u.email === email && u.password === password);
        
        if (foundUser) {
          const userData = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email
          };
          
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("resumeUser", JSON.stringify(userData));
          toast.success("Login successful!");
          return true;
        } else {
          toast.error("Invalid credentials. Please try again.");
          return false;
        }
      }
      toast.error("Please enter both email and password.");
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      if (email && password && name) {
        // Store in localStorage for this demo
        const storedUsers = localStorage.getItem("resumeUsers");
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        // Check if email already exists
        if (users.some((u: any) => u.email === email)) {
          toast.error("Email already in use. Please use a different email.");
          return false;
        }
        
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password // In a real app, NEVER store plain text passwords
        };
        
        users.push(newUser);
        localStorage.setItem("resumeUsers", JSON.stringify(users));
        
        // Auto login after registration
        const userData = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("resumeUser", JSON.stringify(userData));
        
        toast.success("Registration successful!");
        return true;
      }
      
      toast.error("Please fill in all fields.");
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("resumeUser");
    toast.success("You have been logged out.");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
