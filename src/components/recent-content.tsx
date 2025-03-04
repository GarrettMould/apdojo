import Link from "next/link"
import Image from "next/image"

type ContentItem = {
  title: string;
  type: 'blog' | 'project' | 'visualization';
  description: string;
  date: string;
  image: string;
  link: string;
}

export function RecentContent() {
  const content: ContentItem[] = [
    {
      title: "Retro Route Runner",
      type: "project",
      description: "An Articulate Storyline project to help flag football players learn positions and routes",
      date: "February 2025",
      image: "/images/retroRouteRunner.png",
      link: "/projects/digital-literacy"
    },
    {
      title: "Gradeflation: A Lesson about GDP",
      type: "blog",
      description: "How gradeflation can teach us the differnce between Nominal and Real GDP",
      date: "March 2024",
      image: "/images/gradeflationCoverPhoto.png",
      link: "/blog/effective-elearning"
    },
    {
      title: "I, Pencil: Economics in an Interconnected World ",
      type: "visualization",
      description: "A fun visualization of how economics is connected to everything",
      date: "February 2024",
      image: "/images/iPencil.png",
      link: "/visualizers/learning-analytics"
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Recent Work</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item, index) => (
          <Link 
            href={item.link}
            key={index}
            className="group block overflow-hidden border rounded-lg hover:shadow-lg transition-all"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="text-sm font-medium text-gray-500 mb-2">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:underline">
                {item.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {item.description}
              </p>
              
              <div className="text-sm text-gray-500">
                {item.date}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 