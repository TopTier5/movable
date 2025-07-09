import image1 from "../assets/images/image1.png";
import { Shield, User } from "lucide-react";




export default function Hero() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-200 to bg-cyan-200 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
             style={{backgroundImage: `url(${image1})`}}>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-blue-400/10 to-cyan-500/20">
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">

                <div className="max-w-4xl mx-auto mt-8">
                 <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">MoVable</h1>
                 <p className="text-xl md:text-2xl text-white mb-8 font-semi-bold">
                    Accessible Transportation for Ghanaians</p>

                    <div className="inline-flex items-center bg-blue-600/80 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-8 border border-white/20">
                    <Shield className="w-5 h-5 mr-2"/>
                    <span className="font-medium">Trusted • Accessible • Safe</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">Safe Rides for Persons with
                         <br />Disabilities in Ghana</h2>
                         <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"> MovAble connects people with disabilities to accessible, affordable transportation 
            across Ghana. Your journey matters, and we're here to make it comfortable and safe.</p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="flex items-center bg-blue-500 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30">
                    <div className="w-3 h-3 rounded-full bg-white mr-3"></div>
                    <span className="font-medium">Wheelchair Accessible</span>
                </div>
                <div className="flex items-center bg-blue-500 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30">
                    <div className="w-3 h-3 rounded-full bg-white mr-3"></div>
                    <span className="font-medium">Trained Assistance</span>
                </div>
                <div className="flex items-center bg-blue-500 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30">
                    <div className="w-3 h-3 rounded-full bg-white mr-3"></div>
                    <span className="font-medium">Real time Safety</span>
                </div>
            </div>


            <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-8 py-4 duration-200 rounded-full transition-colors font-semibold flex items-center mx-auto shadow-lg">
                <User className="w-5 h-5 mr-2" />
                Register Now
            </button>
                </div>
            </div>
        </div>
    )
};