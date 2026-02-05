import { useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { CalendarIcon, Star, Weight, Info, Package } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import type { CartItem } from "../App";

interface EquipmentPageProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onAddToCart: (item: CartItem) => void;
}

const categories = [
  { id: "all", name: "Tout", icon: Package },
  { id: "tents", name: "Tentes", icon: Package },
  { id: "backpacks", name: "Sacs à dos", icon: Package },
  { id: "shoes", name: "Chaussures", icon: Package },
  { id: "poles", name: "Bâtons", icon: Package },
  { id: "stoves", name: "Réchauds", icon: Package },
  { id: "headlamps", name: "Lampes frontales", icon: Package },
  { id: "gps", name: "GPS & Montres", icon: Package },
];

interface Equipment {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  photos: string[];
  brand: string;
  available: boolean;
  weight: number;
  condition: "new" | "good" | "used";
  description: string;
}

const equipmentItems: Equipment[] = [
  {
    id: "1",
    name: "Tente 2 places ultra-légère",
    category: "tents",
    price: 15,
    rating: 4.8,
    reviews: 42,
    photos: [
      "https://images.unsplash.com/photo-1731082627921-77d00a9e5ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwdGVudCUyMG91dGRvb3J8ZW58MXx8fHwxNzY5Nzc2ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "MSR",
    available: false,
    weight: 1.2,
    condition: "new",
    description:
      "Tente ultra-légère idéale pour les randonnées en montagne. Construction en nylon ripstop avec double toit imperméable. Facile à monter même dans des conditions difficiles. Excellente ventilation et résistance au vent.",
  },
  {
    id: "2",
    name: "Sac à dos 40L",
    category: "backpacks",
    price: 12,
    rating: 4.6,
    reviews: 38,
    photos: [
      "https://images.unsplash.com/photo-1669732536692-ea3af4f41b60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjBiYWNrcGFjayUyMG1vdW50YWlufGVufDF8fHx8MTc2OTc3Njg2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "Osprey",
    available: true,
    weight: 1.5,
    condition: "good",
    description:
      "Sac à dos polyvalent de 40 litres parfait pour les randonnées de 2-3 jours. Système de portage ergonomique avec ceinture ventrale rembourrée. Nombreuses poches de rangement et accès frontal pratique.",
  },
  {
    id: "3",
    name: "Chaussures randonnée haute",
    category: "shoes",
    price: 10,
    rating: 4.9,
    reviews: 56,
    photos: [
      "https://images.unsplash.com/photo-1559506026-181ed433f0b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjBib290cyUyMHRyZWtraW5nfGVufDF8fHx8MTc2OTc3Njg2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "Salomon",
    available: true,
    weight: 1.1,
    condition: "new",
    description:
      "Chaussures de randonnée montantes avec membrane Gore-Tex imperméable et respirante. Semelle Contagrip pour une adhérence optimale. Support de cheville renforcé et protection des orteils.",
  },
  {
    id: "4",
    name: "Réchaud à gaz portable",
    category: "stoves",
    price: 8,
    rating: 4.7,
    reviews: 31,
    photos: [
      "https://images.unsplash.com/photo-1685346051443-753b580fb2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwc3RvdmUlMjBnYXN8ZW58MXx8fHwxNzY5Nzc2ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "Jetboil",
    available: true,
    weight: 0.4,
    condition: "good",
    description:
      "Réchaud compact et efficace pour la cuisine en plein air. Allumage piézo intégré et régulateur de pression. Fait bouillir 1 litre d'eau en moins de 3 minutes. Compatible avec cartouches à vis standard.",
  },
  {
    id: "5",
    name: "Lampe frontale LED 500 lumens",
    category: "headlamps",
    price: 5,
    rating: 4.5,
    reviews: 64,
    photos: [
      "https://images.unsplash.com/photo-1600201319330-e99245e614c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkbGFtcCUyMGZsYXNobGlnaHQlMjBvdXRkb29yfGVufDF8fHx8MTc2OTc3Njg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "Petzl",
    available: true,
    weight: 0.1,
    condition: "new",
    description:
      "Lampe frontale puissante avec 3 modes d'éclairage. Batterie rechargeable USB avec autonomie jusqu'à 10h. Faisceau réglable et mode rouge pour préserver la vision nocturne. Résistante à l'eau (IPX4).",
  },
  {
    id: "6",
    name: "Tente 4 places familiale",
    category: "tents",
    price: 25,
    rating: 4.7,
    reviews: 28,
    photos: [
      "https://images.unsplash.com/photo-1731082627921-77d00a9e5ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwdGVudCUyMG91dGRvb3J8ZW58MXx8fHwxNzY5Nzc2ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "Coleman",
    available: true,
    weight: 5.2,
    condition: "good",
    description:
      "Grande tente familiale spacieuse pour 4 personnes. Structure tunnel avec arceaux pré-montés pour installation rapide. Hauteur sous plafond généreuse (1,80m). Auvent avant pour abriter les bagages.",
  },
  {
    id: "7",
    name: "Sac à dos 70L grand trek",
    category: "backpacks",
    price: 18,
    rating: 4.8,
    reviews: 45,
    photos: [
      "https://images.unsplash.com/photo-1669732536692-ea3af4f41b60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjBiYWNrcGFjayUyMG1vdW50YWlufGVufDF8fHx8MTc2OTc3Njg2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "Deuter",
    available: true,
    weight: 2.3,
    condition: "new",
    description:
      "Grand sac à dos de 70 litres pour expéditions longue durée. Système de portage Aircomfort avec circulation d'air dans le dos. Réglage hauteur des bretelles et de la ceinture. Housse de pluie intégrée.",
  },
  {
    id: "8",
    name: "Bâtons de randonnée carbone",
    category: "poles",
    price: 6,
    rating: 4.6,
    reviews: 52,
    photos: [
      "https://images.unsplash.com/photo-1662109141645-55e2c004acff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVra2luZyUyMHBvbGVzJTIwaGlraW5nfGVufDF8fHx8MTc2OTc3Njg2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "Black Diamond",
    available: true,
    weight: 0.5,
    condition: "good",
    description:
      "Paire de bâtons télescopiques en carbone ultra-légers. Système de verrouillage FlickLock rapide et sûr. Poignées ergonomiques en liège et dragonnes rembourrées. Pointes carbure avec embouts caoutchouc inclus.",
  },
  {
    id: "9",
    name: "Montre GPS multisport",
    category: "gps",
    price: 20,
    rating: 4.9,
    reviews: 73,
    photos: [
      "https://images.unsplash.com/photo-1734776579769-4fbfcdd12b6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncHMlMjB3YXRjaCUyMHNtYXJ0d2F0Y2h8ZW58MXx8fHwxNzY5Nzc2ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "Garmin",
    available: true,
    weight: 0.08,
    condition: "new",
    description:
      "Montre GPS multisport avec cartographie préchargée. Suivi d'itinéraire, altimètre barométrique et boussole 3 axes. Autonomie jusqu'à 20h en mode GPS. Étanche 10 ATM et fonctions connectées.",
  },
  {
    id: "10",
    name: "Sac de couchage -10°C",
    category: "tents",
    price: 14,
    rating: 4.7,
    reviews: 39,
    photos: [
      "https://images.unsplash.com/photo-1618688961306-0fd4345a73b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlcGluZyUyMGJhZyUyMGNhbXBpbmd8ZW58MXx8fHwxNzY5Nzc2ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "Marmot",
    available: true,
    weight: 1.8,
    condition: "good",
    description:
      "Sac de couchage sarcophage en duvet 650+ pour 3 saisons. Température confort -5°C, limite -10°C. Capuche avec cordon de serrage et collerette anti-froid. Compression excellente pour le transport.",
  },
  {
    id: "11",
    name: "Bâtons de trail ajustables",
    category: "poles",
    price: 7,
    rating: 4.4,
    reviews: 28,
    photos: [
      "https://images.unsplash.com/photo-1662109141645-55e2c004acff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVra2luZyUyMHBvbGVzJTIwaGlraW5nfGVufDF8fHx8MTc2OTc3Njg2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "Leki",
    available: true,
    weight: 0.45,
    condition: "used",
    description:
      "Bâtons pliables en aluminium pour trail running et randonnée rapide. Se plient en 38cm pour rangement facile dans le sac. Ajustement rapide de 100 à 130cm. Sangle de poignet détachable.",
  },
  {
    id: "12",
    name: "Chaussures de trail légères",
    category: "shoes",
    price: 9,
    rating: 4.7,
    reviews: 61,
    photos: [
      "https://images.unsplash.com/photo-1559506026-181ed433f0b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjBib290cyUyMHRyZWtraW5nfGVufDF8fHx8MTc2OTc3Njg2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    brand: "La Sportiva",
    available: true,
    weight: 0.6,
    condition: "good",
    description:
      "Chaussures de trail running légères et dynamiques. Semelle Vibram MegaGrip pour adhérence sur terrain technique. Upper respirant avec protection renforcée. Idéales pour courses en montagne.",
  },
];

export function EquipmentPage({
  selectedCategory,
  onCategoryChange,
  onAddToCart,
}: EquipmentPageProps) {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null,
  );

  const filteredItems =
    selectedCategory === "all"
      ? equipmentItems
      : equipmentItems.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item: Equipment) => {
    if (!dateRange.from || !dateRange.to) {
      alert("Veuillez sélectionner une période de location");
      return;
    }

    const days = differenceInDays(dateRange.to, dateRange.from) + 1;

    onAddToCart({
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.photos?.[0] ?? "",
      startDate: format(dateRange.from, "dd/MM/yyyy", { locale: fr }),
      endDate: format(dateRange.to, "dd/MM/yyyy", { locale: fr }),
      days,
    });

    setSelectedItem(null);
    setDateRange({ from: undefined, to: undefined });
  };

  const getConditionBadge = (condition: Equipment["condition"]) => {
    const badges = {
      new: { label: "Neuf", className: "bg-green-500" },
      good: { label: "Bon état", className: "bg-blue-500" },
      used: { label: "Usagé", className: "bg-orange-500" },
    };
    return badges[condition];
  };

  const openDetails = (item: Equipment) => {
    setSelectedEquipment(item);
    setDetailsOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Équipement de randonnée</h1>
        <p className="text-gray-600">
          {selectedCategory === "all"
            ? `Parcourez notre sélection d'équipements de qualité (${filteredItems.length} articles trouvés)`
            : `Catégorie: ${categories.find((c) => c.id === selectedCategory)?.name} (${filteredItems.length} articles trouvés)`}
        </p>
      </div>

      {/* Category Filter - Equipment Type Filter */}
      <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Filtrer par catégorie</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => onCategoryChange(category.id)}
              className={
                selectedCategory === category.id
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square overflow-hidden bg-gray-100 relative">
              <img
                src={item.photos?.[0] ?? ""}
                alt={item.name}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
              <Badge
                className={`absolute top-2 right-2 ${getConditionBadge(item.condition).className}`}
              >
                {getConditionBadge(item.condition).label}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="mb-2">
                {item.available ? (
                  <Badge
                    variant="default"
                    className="!bg-green-600 !text-white"
                  >
                    Disponible
                  </Badge>
                ) : (
                  <Badge variant="destructive">Indisponible</Badge>
                )}
              </div>
              <h3 className="mb-2">{item.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{item.rating}</span>
                <span className="text-sm text-gray-500">({item.reviews})</span>
              </div>
              <div className="flex items-center gap-1 mb-3 text-sm text-gray-600">
                <Weight className="w-4 h-4" />
                <span>{item.weight} kg</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl text-emerald-600">{item.price}€</span>
                <span className="text-gray-600">/jour</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                onClick={() => openDetails(item)}
              >
                <Info className="w-4 h-4 mr-2" />
                Voir détails
              </Button>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Popover
                open={selectedItem === item.id}
                onOpenChange={(open) => setSelectedItem(open ? item.id : null)}
              >
                <PopoverTrigger asChild>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Réserver
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-4">
                    <h4 className="mb-3">Sélectionnez vos dates</h4>
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) =>
                        setDateRange({ from: range?.from, to: range?.to })
                      }
                      numberOfMonths={1}
                      disabled={(date) => date < new Date()}
                      locale={fr}
                    />
                    {dateRange.from && dateRange.to && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="mb-2">
                          <span className="text-sm text-gray-600">Durée:</span>
                          <span className="ml-2">
                            {differenceInDays(dateRange.to, dateRange.from) + 1}{" "}
                            jours
                          </span>
                        </div>
                        <div className="mb-4">
                          <span className="text-sm text-gray-600">Total:</span>
                          <span className="ml-2">
                            {(differenceInDays(dateRange.to, dateRange.from) +
                              1) *
                              item.price}
                            €
                          </span>
                        </div>
                        <Button
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => handleAddToCart(item)}
                        >
                          Ajouter au panier
                        </Button>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600">
            Aucun équipement trouvé dans cette catégorie
          </p>
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedEquipment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEquipment.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={selectedEquipment.photos?.[0] ?? ""}
                    alt={selectedEquipment.name}
                    loading="lazy"
                    decoding="async"
                    sizes="100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-emerald-600">
                    {selectedEquipment.brand}
                  </Badge>
                  <Badge
                    className={
                      getConditionBadge(selectedEquipment.condition).className
                    }
                  >
                    {getConditionBadge(selectedEquipment.condition).label}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Prix de location
                    </p>
                    <p className="text-2xl text-emerald-600">
                      {selectedEquipment.price}€ /jour
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Poids</p>
                    <p className="text-xl flex items-center gap-1">
                      <Weight className="w-5 h-5" />
                      {selectedEquipment.weight} kg
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Note</p>
                    <p className="text-xl flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      {selectedEquipment.rating} ({selectedEquipment.reviews}{" "}
                      avis)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Disponibilité</p>
                    <p className="text-xl">
                      {selectedEquipment.available ? (
                        <span className="text-green-600">Disponible</span>
                      ) : (
                        <span className="text-red-600">Non disponible</span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2">Description</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedEquipment.description}
                  </p>
                </div>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => {
                    setDetailsOpen(false);
                    setSelectedItem(selectedEquipment.id);
                  }}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Réserver cet équipement
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
