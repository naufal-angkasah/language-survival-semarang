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
      {/* Alert Header */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-red-950">
            {language === 'id' ? 'Nomor Darurat Kota Semarang' : 'Semarang Emergency Services'}
          </h3>
          <p className="text-xs text-red-800 mt-0.5 leading-relaxed">
            {language === 'id'
              ? 'Simpan nomor ini di ponsel Anda untuk keadaan darurat medis, kepolisian, atau bantuan internasional.'
              : 'Keep these emergency contacts handy for medical issues, safety reports, or embassy/student affairs.'}
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="space-y-2.5">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {contact.name}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {contact.category}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={`tel:${contact.number.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg active-press transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{contact.number}</span>
                </a>

                {contact.mapsUrl && (
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition"
                  >
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    <span>Peta</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
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
