import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        {/* 404 Illustration */}
        <div className="mb-8 relative">
          <div className="w-48 h-48 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-6xl font-bold text-primary">404</span>
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-primary/20 rounded-full"></div>
        </div>
        
        {/* Error Message */}
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        
        {/* Action Button */}
        <Button asChild size="lg" className="px-6">
          <Link href="/">
            Return to Home
          </Link>
        </Button>
        
        {/* Additional Help */}
        <p className="mt-8 text-sm text-muted-foreground">
          If you believe this is an error, please{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}