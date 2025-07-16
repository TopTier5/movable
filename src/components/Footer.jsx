import {Phone, MapPin,Mail} from 'lucide-react';
import Logo from "../assets/images/logo.png";

export default function Footer() {
    return (
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4 font-sans w-full">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 pb-0">
                    {/* Column 1: Logo and description */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4 ">
                            <img src={Logo} alt="MovAble Logo" className="w-8 h-8 bg-white" />
                            <span className="text-2xl font-semibold">MoVable</span>
                        </div>
                        <p className="text-sm leading-6 text-slate-300 mb-4">
                            Accessible transportation for people with disabilities in Ghana. Safe, reliable, and designed with you in mind.
                        </p>
                        <p className="text-xs text-slate-300 leading-5">
                            <span role="img" aria-label="Ghana flag">🇬🇭</span> Proudly serving Ghana<br />
                            Starting in Accra & Kumasi
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="col-span-1 lg:col-span-1">
                        <h3 className="text-lg font-semibold text-blue-300 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-slate-300 hover:text-blue-300 transition-colors duration-300">Home</a></li>
                            <li><a href="#" className="text-sm text-slate-300 hover:text-blue-300 transition-colors duration-300">Register as Rider</a></li>
                            {/* <li><a href="#" className="text-sm text-slate-300 hover:text-blue-300 transition-colors duration-300">Become a Driver</a></li> */}
                            <li><a href="#" className="text-sm text-slate-300 hover:text-blue-300 transition-colors duration-300">Features</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div className="col-span-1 lg:col-span-1">
                        <h3 className="text-lg font-semibold text-blue-300 mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-slate-300 hover:text-blue-300 transition-colors duration-300">Help Center</a></li>
                            <li><a href="#" className="text-sm text-slate-300 hover:text-blue-300 transition-colors duration-300">Safety Guidelines</a></li>
                            <li><a href="#" className="text-sm text-slate-300 hover:text-blue-300 transition-colors duration-300">Accessibility Support</a></li>
                            <li><a href="#" className="text-sm text-slate-300 hover:text-blue-300 transition-colors duration-300">Community Guidelines</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div className="col-span-1 lg:col-span-1">
                        <h3 className="text-lg font-semibold text-blue-300 mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-sm">
                                <Phone className="text-blue-400 w-4 h-4 stroke-[3]" />
                                <span className="text-slate-300">+233 546293504</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Mail className="text-blue-400 w-4 h-4 stroke-[3]" />
                                <span className="text-slate-300">support@movable.gh</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <MapPin className="text-blue-400 w-4 h-4 stroke-[3]" />
                                <span className="text-slate-300">Accra & Kumasi Ghana</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-6 border-t border-slate-600" />

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-300 space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        © 2025 MoVable Ghana. All rights reserved.
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                        <a href="#" className="hover:text-blue-300 transition-colors duration-300">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-300 transition-colors duration-300">Terms of Service</a>
                        <a href="#" className="hover:text-blue-400 transition-colors duration-300">Data Protection</a>
                    </div>
                </div>

                <div className="text-xs text-slate-500 text-center mt-4">
                    This platform is designed to be fully accessible and complies with WCAG 2.1 AA standards. If you experience any accessibility issues, please contact our support team.
                </div>
            </div>
        </div>
    );
}