import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Explore",
            links: [
                { label: "Home", href: "/" },
                { label: "All Properties", href: "/properties" },
                { label: "About Us", href: "/about" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "Blog", href: "/blog" },
                { label: "Careers", href: "/careers" },
                { label: "News", href: "/news" },
            ],
        },
        {
            title: "Support",
            links: [
                { label: "Contact Us", href: "/contact" },
                { label: "FAQ", href: "/faq" },
                { label: "Help Center", href: "/help" },
            ],
        },
    ];

    const legalLinks = [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
    ];

    // Premium SVG Icons for Social Media
    const socialLinks = [
        { 
            label: "Facebook", 
            href: "https://facebook.com", 
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
            ) 
        },
        { 
            label: "Twitter", 
            href: "https://twitter.com", 
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ) 
        },
        { 
            label: "Instagram", 
            href: "https://instagram.com", 
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
            ) 
        },
        { 
            label: "LinkedIn", 
            href: "https://linkedin.com", 
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ) 
        },
    ];

    return (
        <footer className="border-t border-white/10 bg-slate-900 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="group inline-flex flex-col gap-2">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-sm font-black text-white shadow-lg shadow-sky-500/30 ring-1 ring-white/15 transition-transform duration-300 group-hover:-translate-y-0.5">
                                P
                            </span>
                            <span className="flex flex-col leading-tight">
                                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-sky-300/80">
                                    Property Rental
                                </span>
                                <span className="text-sm font-semibold text-white">
                                    Booking
                                </span>
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                            Find your perfect property rental with ease. Premium stays, trusted hosts.
                        </p>
                    </div>

                    {/* Footer Links Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-sky-400"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Social Links Section */}
                    <div className="lg:col-span-1">
                        <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            Connect Us
                        </h3>
                        <div className="flex flex-wrap gap-3.5">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.href}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="group relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md text-slate-400 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-400/50 hover:text-sky-400 hover:shadow-[0_8px_25px_rgba(56,189,248,0.25)]"
                                >
                                    {/* Hover Glow Effect */}
                                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/0 via-cyan-500/0 to-blue-600/0 opacity-0 transition-all duration-300 group-hover:from-sky-400/10 group-hover:via-cyan-500/5 group-hover:to-blue-600/10 group-hover:opacity-100" />
                                    
                                    {/* SVG Icon Container */}
                                    <span className="relative z-10 flex h-[1.15rem] w-[1.15rem] items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mb-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Copyright */}
                    <div className="text-sm text-slate-400">
                        &copy; {currentYear}{" "}
                        <span className="font-semibold text-slate-200">
                            Property Rental Booking Platform
                        </span>
                        . All rights reserved.
                    </div>

                    {/* Legal Links */}
                    <div className="flex flex-wrap gap-6">
                        {legalLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-sky-400"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Premium Badge */}
                <div className="mt-12 flex justify-center">
                    <div className="rounded-full border border-sky-400/20 bg-sky-400/10 px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                        Premium Property Rental Experience
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;