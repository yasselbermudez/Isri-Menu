// components/PlaceFooter.tsx
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  business: {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    isOpen: boolean;
    nextOpening?: string;
    currency: string;
    slug: string;
  };
  onCurrencyChange: (currency: string) => void;
}

export default function PlaceFooter({ business, onCurrencyChange }: Props) {
  const {
    name,
    description,
    address,
    phone,
    email,
    instagram,
    facebook,
    youtube,
    isOpen,
    nextOpening,
    currency,
    slug,
  } = business;

  return (
    <footer className="bg-gray-800 flex flex-col justify-end">
      <div className="w-full pb-12 pt-8 bg-emerald-900 text-white flex flex-col px-4 wrap-break-word">
        <span className="font-semibold text-3xl">{name}</span>
        <p className="text-base text-gray-300 mt-2 whitespace-pre-line">{description}</p>

        {/* Horario */}
        <div className="flex gap-2 items-center mt-6">
          <div className="w-9 h-9 bg-white/15 rounded-full flex items-center flex-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5 mx-auto text-red-300"
            >
              <defs>
                <mask id="ipSTime0">
                  <g fill="none" strokeLinejoin="round" strokeWidth="4">
                    <path
                      fill="#fff"
                      stroke="#fff"
                      d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"
                    />
                    <path
                      stroke="#000"
                      strokeLinecap="round"
                      d="M24.008 12v12.01l8.479 8.48"
                    />
                  </g>
                </mask>
              </defs>
              <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSTime0)" />
            </svg>
          </div>
          <div className="truncate line-clamp-1 leading-tight flex overflow-hidden gap-px items-center flex-wrap text-gray-300">
            <span className={`text-base font-semibold ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
              {isOpen ? 'Open' : 'Closed'}
            </span>
            {!isOpen && nextOpening && (
              <>
                <span className="ml-1">· Opens</span>
                <span className="ml-1">{nextOpening}</span>
              </>
            )}
          </div>
        </div>

        {/* Dirección */}
        <div className="text-white text-base font-semibold flex gap-2 items-center mt-2">
          <div className="w-9 h-9 bg-white/15 rounded-full flex items-center flex-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 11.53 14"
              fill="currentColor"
              className="w-5 h-5 mx-auto"
            >
              <path d="M5.8,14h0c-.11,0-.22-.04-.32-.1-1.54-1-2.89-2.27-3.98-3.75C.57,8.91.05,7.42,0,5.87,0,3.78,1.1,1.83,2.91.77c1.79-1.05,4.02-1.03,5.79.05.87.54,1.59,1.3,2.08,2.2.5.91.75,1.92.75,2.96-.16,2.12-1.1,4.11-2.63,5.58-.83.88-1.76,1.66-2.77,2.32-.1.06-.22.1-.34.12ZM5.76,3.99c-.52,0-1.02.21-1.38.58-.56.57-.73,1.43-.43,2.17.29.74,1.01,1.23,1.81,1.24h.01c.52,0,1.01-.21,1.37-.58.78-.8.76-2.08-.04-2.86-.17-.17-.37-.3-.59-.4-.24-.1-.5-.16-.76-.16Z" />
            </svg>
          </div>
          {address}
        </div>

        {/* Delivery */}
        <div className="flex gap-2 items-center mt-2 text-white text-base font-semibold">
          <div className="w-9 h-9 bg-white/15 rounded-full flex items-center flex-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              fill="currentColor"
              className="w-5 h-5 mx-auto translate-x-px"
            >
              <path d="M13.92,3.5h-.93v-.88c0-.7-.29-1.38-.81-1.87-1.06-1.02-2.77-1-3.81.04C7.86.28,7.16,0,6.44,0,4.95,0,3.74,1.18,3.74,2.62v.88h-.93c-.64,0-1.15.5-1.15,1.12l-1,10.38c0,1.66,1.38,3,3.08,3h6.42c-1.26-.93-2.07-2.43-2.07-4.11,0-1.57.71-2.98,1.82-3.92V3.5h-.77v-.88c0-.27-.05-.55-.14-.82.29-.42.77-.67,1.29-.67.86,0,1.55.67,1.55,1.49v.88h-.78v5.73c.66-.31,1.39-.48,2.17-.48,1.05,0,2.03.32,2.85.87l-1-5c0-.62-.52-1.12-1.16-1.12ZM7.98,3.5h-3.08v-.88c0-.82.69-1.5,1.54-1.5s1.54.68,1.54,1.5v.88ZM16.08,10.93c-.74-.71-1.75-1.15-2.85-1.15-.8,0-1.54.23-2.17.62-.45.27-.84.64-1.15,1.07-.5.67-.79,1.51-.79,2.42,0,.98.34,1.88.91,2.59.75.93,1.9,1.52,3.2,1.52.06,0,.13,0,.19-.01.47-.02.92-.12,1.34-.28,0-.01.02-.01.03-.02,1.5-.61,2.55-2.08,2.55-3.8,0-1.17-.48-2.22-1.26-2.96ZM15.64,14.36h0s-2.05,2.06-2.05,2.06c-.2.2-.52.2-.74,0-.2-.2-.2-.52,0-.74l1.19-1.17h-2.88s-.07,0-.1,0c-.23-.05-.41-.25-.41-.51,0-.24.18-.45.41-.5.03-.01.06-.01.1-.01h2.88l-1.19-1.17c-.2-.21-.2-.53,0-.73.22-.2.54-.2.74,0l2.05,2.06c.09.09.15.22.15.35,0,.15-.05.28-.15.37Z" />
            </svg>
          </div>
          We deliver
        </div>

        {/* Contactos */}
        <div className="flex flex-col gap-3">
          <span className="mt-12 text-sm text-gray-300">Contacts</span>
          <a
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=${phone.replace('+', '')}`}
            className="text-xl font-semibold text-white hover:text-emerald-400 active:text-emerald-400 flex items-center gap-2 rounded-xl bg-white/15 w-fit px-3 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M15.8,4.71C13.41,1.01,8.52-.09,4.73,2.21,1.04,4.51-.15,9.51,2.24,13.21l.19.3-.8,3,3-.8.3.19c1.29.7,2.7,1.1,4.09,1.1,1.5,0,3-.4,4.29-1.2,3.69-2.4,4.79-7.31,2.49-11.1v.02ZM13.71,12.42c-.4.59-.9.99-1.6,1.1-.4,0-.9.19-2.89-.59-1.69-.8-3.1-2.1-4.09-3.6-.59-.7-.9-1.6-.99-2.5,0-.8.3-1.5.8-2,.19-.19.4-.3.59-.3h.5c.19,0,.4,0,.5.4.19.5.7,1.7.7,1.81.1.1.06.87-.4,1.3-.25.29-.3.3-.19.5.4.59.9,1.2,1.39,1.7.59.5,1.2.9,1.9,1.2.19.1.4.1.5-.1.1-.19.59-.7.8-.9.19-.19.3-.19.5-.1l1.6.8c.19.1.4.19.5.3.1.3.1.7-.1.99h-.02Z" />
            </svg>
            {phone}
          </a>
          <a
            target="_blank"
            href={`mailto:${email}`}
            className="text-xl font-semibold text-white hover:text-emerald-400 active:text-emerald-400 flex items-center gap-2 rounded-xl bg-white/15 w-fit px-3 py-2"
          >
            <svg
              fill="currentColor"
              fillRule="evenodd"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              className="w-6 h-6"
            >
              <path d="M1,4.14c0-.95.77-1.71,1.71-1.71h12.57c.95,0,1.71.77,1.71,1.71v.39l-7.56,5.04c-.13.08-.28.12-.44.12-.15,0-.31-.04-.44-.12L1,4.53v-.39ZM1,6.25v7.61c0,.95.77,1.71,1.71,1.71h12.57c.95,0,1.71-.77,1.71-1.71v-7.61l-6.77,4.52h0c-.36.24-.79.36-1.22.36-.43,0-.86-.12-1.22-.35h0S1,6.25,1,6.25Z" />
            </svg>
            {email}
          </a>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col gap-3 mt-12">
          <span className="text-sm text-gray-300">Social media</span>
          <div className="flex items-center flex-wrap gap-3">
            {instagram && (
              <a
                target="_blank"
                href={instagram}
                aria-label="Instagram"
                className="bg-white/15 rounded-full p-3 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="w-7 h-7 text-white group-hover:text-emerald-400 transition-colors"
                >
                  <path
                    fill="currentColor"
                    d="M8 0C5.829 0 5.556.01 4.703.048C3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7C.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297c.04.852.174 1.433.372 1.942c.205.526.478.972.923 1.417c.444.445.89.719 1.416.923c.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417c.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046c.78.035 1.204.166 1.486.275c.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485c.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598c-.28.11-.704.24-1.485.276c-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485c-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486c.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276c.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92a.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217a4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334a2.667 2.667 0 0 1 0-5.334"
                  />
                </svg>
              </a>
            )}
            {facebook && (
              <a
                target="_blank"
                href={facebook}
                aria-label="Facebook"
                className="bg-white/15 rounded-full p-3 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-white group-hover:text-emerald-400 transition-colors"
                >
                  <path
                    fill="currentColor"
                    d="M14.2 2.875A4.625 4.625 0 0 0 9.575 7.5v2.575H7.1c-.124 0-.225.1-.225.225v3.4c0 .124.1.225.225.225h2.475V20.9c0 .124.1.225.225.225h3.4c.124 0 .225-.1.225-.225v-6.975h2.497c.103 0 .193-.07.218-.17l.85-3.4a.225.225 0 0 0-.218-.28h-3.347V7.5a.775.775 0 0 1 .775-.775h2.6c.124 0 .225-.1.225-.225V3.1c0-.124-.1-.225-.225-.225z"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Cambio de moneda */}
        <div className="flex mt-24">
          <div className="flex flex-col gap-2 cursor-pointer rounded-xl bg-white/15 px-4 py-3">
            <div className="flex items-center group/input focus-within:border-emerald-500 relative">
              <Image
                alt={currency}
                src={`/flags/ic_28x28_flag_${currency.toLowerCase()}.svg`}
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="text-sm font-semibold text-white ml-2">{currency}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="text-gray-400 h-4 rotate-90 ml-6 mr-2"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.7"
                  d="M11.6,6.7l8.8,9.3-8.8,9.3"
                />
              </svg>
              <select
                className="opacity-0 absolute inset-0 cursor-pointer"
                aria-label="Change currency"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="CUP">CUP</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enlace a la plataforma */}
        <div className="h-0.5 w-5 bg-white mt-12"></div>
        <a
          href="https://elyerromenu.com/signup?s=NDJ6F"
          rel="noopener noreferrer"
          target="_blank"
          className="text-base font-semibold text-white mt-3 flex items-center gap-2 group hover:text-emerald-400 transition-colors"
        >
          Create your digital catalog
          <div className="p-1 border rounded-full border-emerald-400 group-hover:bg-emerald-400 group-active:bg-emerald-400">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-emerald-400 group-hover:text-gray-900 transition-colors"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </a>
        <a
          href="https://elyerroapp.com"
          rel="noopener noreferrer"
          target="_blank"
          className="mt-2 text-sm text-gray-300 hover:text-emerald-400 transition-colors"
        >
          © 2026 The Isri Apps SRL
        </a>
      </div>
    </footer>
  );
}