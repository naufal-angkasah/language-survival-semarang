import React, { useState } from 'react';
import { EmergencyContact, Language } from '../types';
import { Phone, MapPin, ExternalLink, ShieldAlert, Volume2, VolumeX } from 'lucide-react';
import { speakIndonesian, stopSpeech } from '../utils/speechEngine';

interface EmergencyModalProps {
  contacts: EmergencyContact[];
  language: Language;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  contacts,
  language,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleSpeakEmergency = (contact: EmergencyContact) => {
    if (playingId === contact.id) {
      stopSpeech();
      setPlayingId(null);
      return;
    }

    // Emergency spoken sentence in urgent local Indonesian tone
    let spokenSentence = `Tolong! Saya butuh bantuan darurat untuk ${contact.name}. Segera hubungi ${contact.number}!`;
    if (contact.number === '112') {
      spokenSentence = 'Tolong! Panggilan darurat satu satu dua! Segera kirim bantuan ambulans ke lokasi saya!';
    }

    setPlayingId(contact.id);
    speakIndonesian(spokenSentence, 'emergency', {
      onStart: () => setPlayingId(contact.id),
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null),
    });
  };

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
              ? 'Kontak penting untuk pertolongan medis darurat, laporan kepolisian, dan perlindungan mahasiswa asing. Tekan speaker untuk memutar audio darurat bertenaga.'
              : 'Essential contacts for medical emergencies, police reports, and student assistance. Tap speaker to broadcast urgent voice call.'}
          </p>
        </div>
      </div>

      {/* Contact Cards in Crisp White & Blue */}
      <div className="space-y-2.5">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`bg-white border rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3 transition ${
              playingId === contact.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {contact.name}
                </h4>
                <button
                  onClick={() => handleSpeakEmergency(contact)}
                  className={`p-1 rounded-lg border transition ${
                    playingId === contact.id
                      ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                      : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  }`}
                  title="Putar suara panggilan darurat panik/mendesak"
                >
                  {playingId === contact.id ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

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
