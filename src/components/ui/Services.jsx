import { Lightbulb, Users, TrendingUp, Heart } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Lightbulb,
      title: "Inovasi",
      description: "Mengembangkan ide-ide kreatif dan solusi inovatif untuk berbagai tantangan bisnis dan sosial",
      color: "from-cyan-400 to-cyan-500"
    },
    {
      icon: Users,
      title: "Kolaborasi",
      description: "Membangun kerjasama yang solid antar anggota untuk mencapai tujuan bersama",
      color: "from-sky-400 to-sky-500"
    },
    {
      icon: TrendingUp,
      title: "Pengembangan",
      description: "Fokus pada pengembangan keterampilan entrepreneurship dan leadership siswa",
      color: "from-teal-400 to-teal-500"
    },
    {
      icon: Heart,
      title: "Sosial Impact",
      description: "Menciptakan dampak positif bagi masyarakat melalui berbagai program dan inisiatif",
      color: "from-cyan-400 to-sky-400"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800">
            Apa yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-600">Kami Lakukan</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Kami berkomitmen untuk memberikan nilai terbaik melalui berbagai fokus area
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-cyan-200"
              >
                <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}