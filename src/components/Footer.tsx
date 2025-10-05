import Image from "next/image";

const members = [
  "Eliaz Bobadilla",
  "Leonardo Estacio",
  "Alexandra Flores",
  "Carlos Bonifacio",
  "Yauri Villafuerte",
  "Steven Villanueva",
] as const;

const teacher = "CARLOS ALBERTO BAZÁN CABANILLAS" as const;
const course = "Programación Orientada a Objetos" as const;

export default function Footer() {
  return (
    <footer className="mt-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border-gray-200 dark:border-gray-700">
          <div className="px-6 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <Image
                  src="/uni.png"
                  alt="Logo de la Universidad"
                  width={250}
                  height={250}
                  className="object-contain rounded-lg shadow-sm"
                />

                <div className="text-left space-y-2">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Productify
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <p className="font-semibold">{course}</p>
                    <p>
                      Profesor: <span className="font-medium">{teacher}</span>
                    </p>
                    <p>
                      Ciclo: <span className="font-medium">25-2</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400 mb-3">
                    Miembros del Proyecto
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {members.map((member) => (
                      <div
                        key={member}
                        className="bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg text-sm font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
