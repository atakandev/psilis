// Varsayılan içerik. Supabase'de kayıt yoksa bunlar kullanılır; admin panelden kaydedilince DB'deki değer geçerli olur.
export const DEFAULTS = [
  { key: 'global', label: 'Site settings (phone, SEO, logo)', fixed: true, content: {
    title: 'Psilis Medical Assistant Health | 24/7 Medical Assistance, Doctors, Ambulance & Hospital Coordination',
    description: 'Psilis Assistant Health provides 24/7 medical assistance, doctor dispatch, ambulance services and hospital coordination across Muğla, Marmaris, Fethiye, Kaş, Kalkan, Dalyan, Ortaca, Dalaman, Köyceğiz, Sarigerme and Akyaka.',
    siteUrl: 'https://www.psilismedical.com', logo: '/logo.jpeg',
    phone: '+905555555555', phoneDisplay: '+90 555 555 55 55', whatsapp: '905555555555', email: 'operation@psilismedical.com' } },
  { key: 'header', label: 'Header / navigation', fixed: true, content: {
    brand: 'Psilis Medical', sub: 'Muğla Coast · Medical Assistance', cta: 'Call Now',
    links: [{ label: 'Services', href: '#hizmetler' }, { label: 'Coverage Area', href: '#bolge' }, { label: 'How it Works', href: '#surec' }, { label: 'Contact', href: '#iletisim' }] } },
  { key: 'hero', label: 'Hero', content: {
    eyebrow: '24/7 Medical Assistance · Muğla Coast',
    title: 'When your holiday needs a doctor,', highlight: "we're already on our way.",
    text: 'From Kaş and Kalkan to Fethiye, Marmaris and Akyaka — a doctor to your hotel, hospital arrangements, full insurance handling and 24/7 assistance, one phone call away.',
    callLabel: '📞 Call Emergency Line', whatsappLabel: 'Message on WhatsApp',
    mapPoints: [
      { id: 'marmaris', title: 'Marmaris', description: 'Medical assistance and doctor coordination in Marmaris and nearby resorts.', url: '#iletisim', linkLabel: 'Contact us', x: 27.8, y: 22.7, enabled: true },
      { id: 'dalyan', title: 'Dalyan & Ortaca', description: 'Hotel and holiday accommodation medical assistance in Dalyan and Ortaca.', url: '#iletisim', linkLabel: 'Contact us', x: 40.8, y: 28.3, enabled: true },
      { id: 'dalaman', title: 'Dalaman & Sarıgerme', description: '24/7 assistance around Dalaman Airport and Sarıgerme.', url: '#iletisim', linkLabel: 'Contact us', x: 47.2, y: 33.2, enabled: true },
      { id: 'gocek', title: 'Göcek', description: 'Medical coordination for visitors to Göcek and surrounding bays.', url: '#iletisim', linkLabel: 'Contact us', x: 52.7, y: 36.1, enabled: true },
      { id: 'fethiye', title: 'Fethiye & Ölüdeniz', description: 'Doctor and hospital assistance across Fethiye and Ölüdeniz.', url: '#iletisim', linkLabel: 'Contact us', x: 61.7, y: 41.6, enabled: true },
      { id: 'kalkan', title: 'Kalkan', description: 'Medical support in Kalkan and nearby holiday villages.', url: '#iletisim', linkLabel: 'Contact us', x: 67.5, y: 49.4, enabled: true },
      { id: 'kas', title: 'Kaş', description: 'Medical assistance for hotel guests and travellers in Kaş.', url: '#iletisim', linkLabel: 'Contact us', x: 91.2, y: 75.1, enabled: true }
    ],
    meta: [{ value: '7/24', label: 'Doctor line, always on' }, { value: '5', label: 'Regions: Kaş to Akyaka' }, { value: '%100', label: 'Insurance handled end‑to‑end' }] } },
  { key: 'trust', label: 'Trust strip', content: { items: [
    { icon: '🕑', label: '24/7 Doctor & Call Centre' }, { icon: '🛡️', label: 'Direct Billing, All Insurers' },
    { icon: '🗣️', label: 'English, German, Russian Support' }, { icon: '🏥', label: 'Partnered with Every Private Hospital in the Region' }] } },
  { key: 'services', label: 'Services', content: {
    eyebrow: 'What We Do', title: 'Every medical need your holiday could throw at you, in one call.',
    text: 'From a doctor at your hotel door to hospital referral, insurance paperwork and medication — we run the whole process for you.',
    items: [
      { icon: '🩺', title: 'Doctor to Your Hotel', text: "We dispatch a doctor to wherever you're staying, any hour of the day — no waiting rooms involved." },
      { icon: '🏥', title: 'Hospital & Specialist Booking', text: 'We match you to the right specialist and hospital, book the appointment, and stay with you through the visit.' },
      { icon: '📄', title: 'Insurance & Claims Handling', text: 'We liaise directly with your travel insurer, chasing approvals and paperwork on your behalf.' },
      { icon: '🚑', title: 'Emergency Transfer Coordination', text: 'In an emergency we coordinate ambulance dispatch and safe transfer to the nearest suitable facility.' },
      { icon: '💊', title: 'Prescription & Pharmacy Delivery', text: 'We source your prescribed medication and deliver it to your door.' },
      { icon: '☎️', title: 'Ongoing Case Follow-up', text: "A dedicated assistant stays in touch until you're well and your holiday is back on track." }] } },
  { key: 'coverage', label: 'Coverage area', content: {
    eyebrow: 'Coverage Area', title: 'From Kaş to Akyaka, the whole coastline is covered.',
    text: "Along the southwest Aegean and western Mediterranean coast, wherever you're staying, our team can reach you.",
    places: ['Kaş & Kalkan', 'Fethiye & Ölüdeniz', 'Fethiye & Gocek', 'Marmaris', 'Akyaka & Gökova', 'Ortaca & Dalyan', 'Dalaman & Sarigerme'] } },
  { key: 'process', label: 'How it works', content: {
    eyebrow: 'How It Works', title: 'Four steps from your call to resolution.',
    steps: [
      { title: 'You Call', text: 'Reach our 24/7 line — an assistant answers in your language.' },
      { title: 'Assessment', text: 'We assess your condition and identify the right doctor or facility.' },
      { title: 'Dispatch', text: 'We send a doctor to your location or book your hospital appointment.' },
      { title: 'Insurance & Follow-up', text: "We handle the insurance process and stay in touch until you've recovered." }] } },
  { key: 'contact', label: 'Contact & callback form', content: {
    eyebrow: 'Contact', title: 'Call now — help can be with you within minutes.',
    cardEyebrow: 'Emergency Medical Line', cardTitle: "We're here around the clock.",
    cardText: 'Uninterrupted support for every guest staying in Kaş, Kalkan, Fethiye, Gocek, Marmaris, Dalaman, Ortaca, Sarigerme, Dalyan, Koycegiz, and Akyaka.',
    whatsappLabel: 'Message on WhatsApp', formTitle: 'Request a Callback',
    namePlaceholder: 'Full Name', phonePlaceholder: 'Phone Number', insurancePlaceholder: 'Insurance Provider (optional)',
    messagePlaceholder: 'Briefly describe your situation', submitLabel: 'Send Request',
    note: "We'll call you back as soon as possible.", successMessage: 'Thank you! We received your request and will call you shortly.' } },
  { key: 'footer', label: 'Footer', fixed: true, content: {
    brand: 'Psilis Medical', copyright: '© 2026 Psilis Medical Assist. All rights reserved.',
    cols: [
      { title: 'Services', items: ['Doctor Callout', 'Hospital Booking', 'Insurance Handling'] },
      { title: 'Region', items: ['Kaş & Kalkan', 'Fethiye & Ölüdeniz', 'Fethiye & Gocek', 'Dalyan & Sarigerme', 'Marmaris & Akyaka'] },
      { title: 'Contact', items: ['+90 555 555 55 55', 'operation@psilismedical.com'] }] } },
]
