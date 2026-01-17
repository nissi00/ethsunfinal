import { Facebook, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialShareProps {
    url: string
    title: string
}

export function SocialShare({ url, title }: SocialShareProps) {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    const shareLinks = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: "#0077b5",
        },
        {
            name: "Twitter",
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: "#1da1f2",
        },
        {
            name: "Facebook",
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "#1877f2",
        },
        {
            name: "Email",
            icon: Mail,
            href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
            color: "#ea4335",
        },
    ]

    return (
        <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-500 mr-2">Partager :</span>
            {shareLinks.map((link) => (
                <Button
                    key={link.name}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100"
                    onClick={() => window.open(link.href, "_blank", "width=600,height=400")}
                    title={`Partager sur ${link.name}`}
                >
                    <link.icon className="h-4 w-4" style={{ color: link.color }} />
                </Button>
            ))}
        </div>
    )
}
