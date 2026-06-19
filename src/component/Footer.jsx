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

    const socialLinks = [
        { label: "Facebook", href: "https://facebook.com", icon: "f" },
        { label: "Twitter", href: "https://twitter.com", icon: "𝕏" },
        { label: "Instagram", href: "https://instagram.com", icon: "📷" },
        { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
    ];

    return (
        <footer className="border-t border-white/10 bg-slate-900 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="group inline-flex flex-col gap-2">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 via-sky-500 to-blue-600 text-sm font-black text-white shadow-lg shadow-sky-500/30 ring-1 ring-white/15 transition-transform duration-300 group-hover:-translate-y-0.5">
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
                        <p className="mt-4 text-sm text-slate-400">
                            Find your perfect property rental with ease. Premium stays, trusted hosts.
                        </p>
                    </div>

                    {/* Footer Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-400 transition-colors duration-200 hover:text-sky-300"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Social Links */}

                    <div>
                        <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
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
                                    className="group relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-md text-slate-300 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-400/50 hover:text-sky-400 hover:shadow-[0_8px_25px_rgba(56,189,248,0.25)]"
                                >
                                    <span className="absolute inset-0 rounded-2xl bg-linear-to-br from-sky-400/0 via-cyan-500/0 to-blue-600/0 opacity-0 transition-all duration-300 group-hover:from-sky-400/10 group-hover:via-cyan-500/5 group-hover:to-blue-600/10 group-hover:opacity-100" />

                                    <span className="relative z-10 flex h-5 w-5 items-center justify-center transition-transform duration-300 group-hover:scale-110 [&>svg]:h-full [&>svg]:w-full">
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
                        <span className="font-semibold text-white">
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
                                className="text-sm text-slate-400 transition-colors duration-200 hover:text-sky-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>


                {/* Premium Badge */}
                <div className="mt-12 flex justify-center">
                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.15em] text-emerald-200">
                        Premium Property Rental Experience
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
