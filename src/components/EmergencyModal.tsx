import React from 'react';
import { EmergencyContact, Language } from '../types';
import { Phone, MapPin, ExternalLink, ShieldAlert } from 'lucide-react';

interface EmergencyModalProps {
  contacts: EmergencyContact[];
  language: Language;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  contacts,
  language,
}) => {
  return (
    <div className="space-y-4 pb-12">
      {/* Alert Header in Clean Blue/Red Accent */}
      <div className="bg-white border border-blue-200 rounded-3xl p-4 sm:p-5 shadow-xs flex items-start gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'id' ? 'Nomor Darurat Kota Semarang' : 'Semarang Emergency Services'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            {language === 'id'
              ? 'Kontak penting untuk pertolongan medis darurat, laporan kepolisian, dan perlindungan mahasiswa asing.'
              : 'Essential contacts for medical emergencies, police reports, and international student assistance.'}
          </p>
        </div>
      </div>

      {/* Contact Cards in Crisp White & Blue */}
      <div className="space-y-2.5">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {contact.name}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {contact.category}
              </p>
              <div className="flex items-center gap-2 mt-2.5">
                <a
                  href={`tel:${contact.number.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl active-press transition shadow-2xs shadow-blue-600/20"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{contact.number}</span>
                </a>

                {contact.mapsUrl && (
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-2.5 py-1.5 rounded-xl transition"
                  >
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Rute Peta</span>
                    <ExternalLink className="w-3 h-3 text-blue-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
