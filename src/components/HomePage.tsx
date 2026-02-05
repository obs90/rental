import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Tent,
  Backpack,
  FootprintsIcon as Footprints,
  Zap,
  Flame,
  Lightbulb,
  Watch,
  Shield,
  Clock,
  Award,
} from "lucide-react";

interface HomePageProps {
  onNavigateToEquipment: (category: string) => void;
}

const categories = [
  { id: "tents", name: "Tentes", icon: Tent, count: 15 },
  { id: "backpacks", name: "Sacs à dos", icon: Backpack, count: 24 },
  { id: "shoes", name: "Chaussures de randonnée", icon: Footprints, count: 18 },
  { id: "poles", name: "Bâtons de randonnée", icon: Zap, count: 12 },
  { id: "stoves", name: "Réchauds", icon: Flame, count: 10 },
  { id: "headlamps", name: "Lampes frontales", icon: Lightbulb, count: 20 },
  { id: "gps", name: "GPS & Montres", icon: Watch, count: 8 },
];

const features = [
  {
    icon: Shield,
    title: "Équipement vérifié",
    description: "Tout notre matériel est contrôlé et entretenu régulièrement",
  },
  {
    icon: Clock,
    title: "Location flexible",
    description: "Louez de 1 jour à plusieurs semaines selon vos besoins",
  },
  {
    icon: Award,
    title: "Qualité garantie",
    description: "Des marques reconnues pour votre sécurité et confort",
  },
];

export function HomePage({ onNavigateToEquipment }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1603475429038-44361bcde123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpa2luZyUyMHRyYWlsfGVufDF8fHx8MTc2Njg2NDU0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl mb-6">
              Louez votre équipement de randonnée
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Du matériel de qualité pour toutes vos aventures en montagne.
              Location simple, rapide et économique.
            </p>
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => onNavigateToEquipment("all")}
            >
              Découvrir l'équipement
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Sectionn */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Nos catégories d'équipement
            </h2>
            <p className="text-lg text-gray-600">
              Trouvez tout ce dont vous avez besoin pour votre prochaine
              randonnée
            </p>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const colors = [
                "from-emerald-50 to-emerald-100",
                "from-blue-50 to-blue-100",
                "from-green-50 to-green-100",
                "from-teal-50 to-teal-100",
                "from-cyan-50 to-cyan-100",
                "from-emerald-50 to-teal-100",
                "from-green-50 to-emerald-100",
              ];
              const iconColors = [
                "text-emerald-600",
                "text-blue-600",
                "text-green-600",
                "text-teal-600",
                "text-cyan-600",
                "text-teal-600",
                "text-green-600",
              ];
              const bgColors = [
                "bg-emerald-100",
                "bg-blue-100",
                "bg-green-100",
                "bg-teal-100",
                "bg-cyan-100",
                "bg-teal-100",
                "bg-green-100",
              ];

              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br ${colors[index % colors.length]} overflow-hidden group`}
                  onClick={() => onNavigateToEquipment(category.id)}
                >
                  <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                    <div
                      className={`w-20 h-20 ${bgColors[index % bgColors.length]} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all`}
                    >
                      <Icon
                        className={`w-10 h-10 ${iconColors[index % iconColors.length]}`}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <span className="text-sm font-semibold text-emerald-600">
                        {category.count}
                      </span>
                      <p className="text-sm">articles</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-gray-700 font-medium">
                        Cliquer pour explorer →
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Pourquoi nous choisir ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">Prêt pour l'aventure ?</h2>
          <p className="text-xl mb-8 text-emerald-50">
            Réservez dès maintenant votre équipement et partez explorer les
            sentiers
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => onNavigateToEquipment("all")}
          >
            Voir tout l'équipement
          </Button>
        </div>
      </section>
    </div>
  );
}
