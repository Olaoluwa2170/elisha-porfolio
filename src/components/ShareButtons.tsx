import { Link2, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Couldn't copy the link");
    }
  };

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;
  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} ${url}`
  )}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-1">
        Share
      </span>
      <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy link">
        <Link2 className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon" asChild aria-label="Share on X">
        <a href={twitterHref} target="_blank" rel="noopener noreferrer">
          <Twitter className="w-4 h-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild aria-label="Share on LinkedIn">
        <a href={linkedinHref} target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-4 h-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild aria-label="Share on WhatsApp">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.83 14.16c-.25.7-1.25 1.28-2.03 1.44-.54.11-1.24.2-3.6-.77-3.02-1.25-4.97-4.32-5.12-4.52-.15-.2-1.23-1.63-1.23-3.11s.76-2.21 1.03-2.51c.27-.3.6-.37.8-.37.2 0 .4.002.57.01.18.008.43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.48.13.66-.08.18-.2.75-.87.96-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.23.57.36.08.13.08.75-.17 1.45Z" />
          </svg>
        </a>
      </Button>
    </div>
  );
}
