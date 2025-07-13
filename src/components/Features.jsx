import { MapPin, Check } from "lucide-react";
import { Volume2, Users } from "lucide-react";









export default function Features() {
    return (
        <div className="min-h-screen bg-[#F6F4F0] py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 mt-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Built for <span className="text-blue-600">People with Disabilities</span></h1>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">Every feature is thoughtfully designed to ensure safe, comfortable, and independent 
            travel for people with disabilities in Ghana.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:shadow-blue-400 transition-all duration-300">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-20 rounded-full flex items-center justify-center">
                                <MapPin className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">Smart Accessibility Matching</h3>
                        <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">Automatically connects you with vehicles and trained drivers that 
              match your specific disability needs in Ghana.</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"/>
                    <span>Wheelchair accessible vehicles</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Guide dog friendly rides</span>
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Customized assistance preferences</span>
              </div>
              </div>
                    </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:shadow-blue-400 transition-all duration-300">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-20 rounded-full flex items-center justify-center">
                                <Volume2 className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">Voice & Screen Reader Support</h3>
                        <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">Fully optimized for screen readers with voice commands for easy 
              booking and ride tracking.</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"/>
                    <span>Screen reader compatible</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Voice-activated booking</span>
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Audio ride updates</span>
              </div>
              </div>
                    </div>

                    
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:shadow-blue-400 transition-all duration-300">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-20 rounded-full flex items-center justify-center">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">Family & Caregiver Safety</h3>
                        <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">Caregivers can book rides and receive real-time updates with 
              comprehensive safety features.</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"/>
                    <span>Live GPS trip sharing</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Emergency SOS button</span>
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Family notifications</span>
              </div>
              </div>
                    </div>

















                </div>







            </div>
            
        </div>
    )
}