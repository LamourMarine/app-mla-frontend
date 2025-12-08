// src/pages/Contact.tsx
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Me contacter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ce site est un projet portfolio développé dans le cadre de ma
            formation de développeuse web. N'hésitez pas à me contacter pour
            échanger sur ce projet ou pour toute opportunité professionnelle.
          </p>
        </div>

        {/* Cards de contact */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Email */}
          <a
            href="mailto:marine.lamour@gmx.fr"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-start gap-4"
          >
            <div className="bg-green-100 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600">marine.lamour@gmx.fr</p>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/marine-lma/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-start gap-4"
          >
            <div className="bg-blue-100 p-3 rounded-lg">
              <Linkedin className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">LinkedIn</h3>
              <p className="text-gray-600">Marine Lamour</p>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/LamourMarine"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-start gap-4"
          >
            <div className="bg-gray-100 p-3 rounded-lg">
              <Github className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">GitHub</h3>
              <p className="text-gray-600">Voir mes projets</p>
            </div>
          </a>

          {/* Localisation */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Localisation</h3>
              <p className="text-gray-600">Boulogne-sur-Mer / Calais</p>
              <p className="text-sm text-gray-500 mt-1">Hauts-de-France</p>
            </div>
          </div>
        </div>

        {/* Section À propos du projet */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            À propos de Cantine Verte
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Cantine Verte</strong> est une plateforme de mise en
              relation entre producteurs locaux et cantines scolaires des
              Hauts-de-France, développée dans le cadre de ma reconversion
              professionnelle en développement web.
            </p>
            <p>
              <strong>Technologies utilisées :</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Frontend :</strong> React, TypeScript, Redux Toolkit,
                TailwindCSS
              </li>
              <li>
                <strong>Backend :</strong> Symfony 6, PHP 8, API Platform
              </li>
              <li>
                <strong>Base de données :</strong> PostgreSQL (Supabase)
              </li>
              <li>
                <strong>Déploiement :</strong> Netlify (frontend) + Render
                (backend)
              </li>
              <li>
                <strong>Outils :</strong> Docker, Git, Postman
              </li>
            </ul>
            <p className="text-sm text-gray-500 italic mt-6">
              💡 Ce projet est un portfolio destiné à démontrer mes compétences
              en développement full-stack. Les données affichées sont fictives
              et générées pour la démonstration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
