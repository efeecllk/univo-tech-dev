import { Event } from '@/types';

export const mockEvents: Event[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440101',
    title: 'Kampüste Müzik Festivali',
    community: {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Müzik Kulübü',
      category: 'Sanat',
    },
    category: 'event',
    date: '2026-01-15',
    time: '18:00',
    location: 'Ana Kampüs Meydanı',
    excerpt: 'Üniversite müzik kulübü tarafından düzenlenen yıllık müzik festivali. Öğrenci grupları ve konuk sanatçılar sahne alacak.',
    description: `Müzik Kulübü olarak düzenlediğimiz yıllık Kampüs Müzik Festivali'ne tüm öğrencileri bekliyoruz!

Akşam 18:00'de başlayacak festival boyunca farklı türlerde müzik yapan öğrenci grupları sahne alacak. Ayrıca şehrin ünlü indie rock grubu da özel konuk olarak sahnede olacak.

Giriş ücretsiz, yiyecek-içecek stantları mevcut. Kampüste sosyalleşmek ve müzik severlerle tanışmak için harika bir fırsat!`,
    image: '/images/music-festival.jpg',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440102',
    title: 'Yapay Zeka ve Gelecek Paneli',
    community: {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Bilgisayar Mühendisliği Topluluğu',
      category: 'Teknoloji',
    },
    category: 'talk',
    date: '2026-01-18',
    time: '14:00',
    location: 'Mühendislik Fakültesi Konferans Salonu',
    excerpt: 'Yapay zeka alanındaki son gelişmeler ve geleceğe dair öngörülerin tartışılacağı panel. Sektör profesyonelleri ve akademisyenler katılacak.',
    description: `Bilgisayar Mühendisliği Topluluğu olarak, yapay zeka teknolojilerinin geleceğini ve toplum üzerindeki etkilerini tartışacağımız bir panel düzenliyoruz.

Panelimizde:
- Prof. Dr. Ayşe Yılmaz (Yapay Zeka Araştırma Merkezi)
- Mehmet Kaya (Tech Startup CEO)
- Dr. Zeynep Demir (Etik ve Teknoloji Uzmanı)

konuşmacılarımız yapay zekanın etik boyutları, iş dünyasındaki uygulamaları ve gelecek trendleri hakkında görüşlerini paylaşacak. Etkinlik sonunda soru-cevap bölümü olacak.

Katılım ücretsiz, ancak kontenjan sınırlı. Kayıt için QR kod ile başvuru yapabilirsiniz.`,
    image: '/images/ai-panel.jpg',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440103',
    title: 'Bahar Dönemi Ders Kayıtları Başladı',
    community: {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Öğrenci İşleri',
      category: 'Resmi',
    },
    category: 'announcement',
    date: '2026-01-10',
    time: '09:00',
    location: 'Online - Öğrenci Bilgi Sistemi',
    excerpt: '2025-2026 Bahar dönemi ders kayıtları 10 Ocak tarihinde başlıyor. Öğrencilerin dikkat etmesi gereken önemli noktalar.',
    description: `Değerli Öğrencilerimiz,

2025-2026 Bahar Dönemi ders kayıtları 10 Ocak 2026 Cuma günü saat 09:00'da başlayacaktır.

Önemli Noktalar:
- Kayıtlar Öğrenci Bilgi Sistemi (OBS) üzerinden yapılacaktır
- Her sınıf düzeyi için farklı kayıt saatleri belirlenmiştir
- Danışman onayı gereken öğrenciler önceden randevu almalıdır
- Kota dolması durumunda bekleme listesine alınabilirsiniz

Kayıt Tarihleri:
- 1. Sınıf: 10 Ocak 09:00
- 2. Sınıf: 10 Ocak 14:00
- 3. Sınıf: 11 Ocak 09:00
- 4. Sınıf: 11 Ocak 14:00

Sorun yaşayan öğrenciler dekanlık ofisine başvurabilir.`,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440104',
    title: 'Web Geliştirme Workshop Serisi',
    community: {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'Yazılım Geliştirme Kulübü',
      category: 'Teknoloji',
    },
    category: 'workshop',
    date: '2026-01-20',
    time: '15:00',
    location: 'Bilgisayar Laboratuvarı B-204',
    excerpt: 'Modern web teknolojileri ile full-stack geliştirme öğrenmek isteyenler için 4 haftalık workshop serisi başlıyor.',
    description: `Yazılım Geliştirme Kulübü olarak Modern Web Geliştirme Workshop Serimizi duyuruyoruz!

4 haftalık bu seride şunları öğreneceksiniz:
- HTML, CSS, JavaScript temelleri
- React framework ile frontend geliştirme
- Node.js ve Express ile backend oluşturma
- MongoDB database entegrasyonu
- Full-stack proje geliştirme

Workshop Programı:
- Hafta 1: Frontend Temelleri (20 Ocak)
- Hafta 2: React ile Modern UI (27 Ocak)
- Hafta 3: Backend ve API Geliştirme (3 Şubat)
- Hafta 4: Full-stack Proje (10 Şubat)

Her workshop 2 saat sürecek ve uygulamalı olacak. Katılımcılar kendi laptoplarını getirmelidir.

Kontenjan: 30 kişi
Kayıt: dev-club@university.edu`,
    image: '/images/web-workshop.jpg',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440105',
    title: 'Kış Dönemi Kitap Değişimi Etkinliği',
    community: {
      id: '550e8400-e29b-41d4-a716-446655440005',
      name: 'Kitap Kulübü',
      category: 'Sanat',
    },
    category: 'event',
    date: '2026-01-25',
    time: '12:00',
    location: 'Merkez Kütüphane Bahçesi',
    excerpt: 'Okuduğunuz kitapları değiştirebileceğiniz, yeni kitaplar keşfedebileceğiniz bir etkinlik. Kahve eşliğinde kitap sohbetleri.',
    description: `Kitap Kulübü olarak kış döneminin ilk Kitap Değişimi Etkinliğimizi düzenliyoruz!

Nasıl Katılabilirsiniz?
Evinizde okuduğunuz ve başkalarının okumasını istediğiniz kitapları getirebilirsiniz. Her kitap için bir değişim kuponu alacaksınız ve istediğiniz başka bir kitabı alabileceksiniz.

Etkinlikte:
- Kitap değişimi standı
- Sıcak çay ve kahve ikramı
- Kitap önerileri ve tartışmalar
- Yeni arkadaşlıklar

Tüm bölümlerden öğrenciler katılabilir. Geleneksel olarak düzenlediğimiz bu etkinlik kampüsteki edebiyat severleri bir araya getiriyor.

Kitap getirmek zorunlu değil, sadece gezmeye de gelebilirsiniz!`,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440106',
    title: 'Kariyer Günleri 2025',
    community: {
      id: '550e8400-e29b-41d4-a716-446655440006',
      name: 'Kariyer Merkezi',
      category: 'Resmi',
    },
    category: 'event',
    date: '2026-02-05',
    time: '10:00',
    location: 'Spor Salonu',
    excerpt: 'Türkiye\'nin önde gelen şirketlerinin katılacağı kariyer fuarı. CV inceleme, mülakat simülasyonu ve networking fırsatları.',
    description: `Üniversitemiz Kariyer Merkezi olarak düzenlediğimiz Kariyer Günleri 2025 etkinliği 5-6 Şubat tarihlerinde gerçekleşecek!

Katılımcı Şirketler:
- 50+ ulusal ve uluslararası şirket
- Teknoloji, finans, sağlık, mühendislik sektörlerinden firmalar
- Staj ve tam zamanlı iş fırsatları

Etkinlik Programı:
- Şirket stantları ve tanıtımları
- Ücretsiz CV inceleme danışmanlığı
- Mock interview (mülakat simülasyonu)
- Kariyer panelleri ve söyleşiler
- Networking oturumları

Tüm bölüm öğrencileri katılabilir. CV'lerinizi güncelleyip yanınızda getirmenizi tavsiye ediyoruz.

Not: Formal kıyafet zorunlu değil ancak profesyonel görünüm önerilir.`,
    image: '/images/career-fair.jpg',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440107',
    title: 'Startup Fikir Yarışması',
    community: {
      id: '550e8400-e29b-41d4-a716-446655440007',
      name: 'Girişimcilik Kulübü',
      category: 'Girişimcilik',
    },
    category: 'announcement',
    date: '2026-01-12',
    time: '17:00',
    location: 'İnovasyon Merkezi',
    excerpt: 'Kendi startup fikrini sunma fırsatı! En iyi 3 fikre mentorluk ve seed fonlama desteği verilecek.',
    description: `Girişimcilik Kulübü olarak düzenlediğimiz Startup Fikir Yarışması başvuruları başladı!

Yarışma Detayları:
Kendi iş fikrinizi 5 dakikalık bir sunumla anlatacaksınız. Jüri üyeleri iş planınızı, pazar potansiyelini ve yenilikçiliğinizi değerlendirecek.

Ödüller:
- 1. ödül: 50.000 TL seed fon + 6 ay mentorluk
- 2. ödül: 25.000 TL + 3 ay mentorluk
- 3. ödül: 10.000 TL + 1 ay mentorluk

Başvuru Şartları:
- En az 2, en fazla 4 kişilik ekipler
- Tüm bölümlerden öğrenciler katılabilir
- Özgün bir iş fikri
- İş planı sunumu (şablon web sitesinde)

Önemli Tarihler:
- Son başvuru: 25 Ocak
- Ön eleme sonuçları: 1 Şubat
- Final sunumları: 15 Şubat

Başvuru için: entrepreneurship-club@university.edu`,
    image: '/images/startup-competition.jpg',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440108',
    title: 'Fotoğrafçılık Atölyesi: Portre Çekimi',
    community: {
      id: '550e8400-e29b-41d4-a716-446655440008',
      name: 'Fotoğraf Kulübü',
      category: 'Sanat',
    },
    category: 'workshop',
    date: '2026-01-28',
    time: '13:00',
    location: 'Sanat Stüdyosu',
    excerpt: 'Portre fotoğrafçılığının temellerini profesyonel fotoğrafçıdan öğreneceğiniz uygulamalı workshop.',
    description: `Fotoğraf Kulübü olarak Portre Çekimi Workshop'umuzu duyuruyoruz!

Workshop İçeriği:
- Işık kullanımı ve doğal ışık teknikleri
- Kompozisyon ve çerçeveleme
- Portre için lens seçimi
- Model yönlendirme
- Post-processing temelleri

Eğitmen:
Ahmet Yıldız - 15 yıllık deneyime sahip profesyonel portre fotoğrafçısı

Workshop uygulamalı olacak, katılımcılar kendi fotoğraf makinelerini veya telefonlarını getirmelidir. Manuel kontrollere sahip bir kamera önerilir.

Süre: 3 saat
Kontenjan: 15 kişi
Ücret: Ücretsiz (Kulüp üyeleri öncelikli)

Kayıt için kulüp Instagram hesabımızdan DM atabilirsiniz: @universefoto`,
  },
  {
    id: 'test-past-event-001',
    title: 'Test Geçmiş Etkinlik: Sinema Gecesi',
    community: {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Sinema Topluluğu',
      category: 'Sanat',
    },
    category: 'event',
    date: '2026-01-01', // Set to a past date relative to "now" (simulated 2026-01-02)
    time: '20:00',
    location: 'Açık Hava Amfisi',
    excerpt: 'Test amaçlı geçmiş etkinlik. Değerlendirme yapabilirsiniz.',
    description: 'Bu bir test etkinliğidir. Geçmiş tarihli olduğu için değerlendirme butonu aktif olmalıdır.',
  },
  {
    id: 'mock-evt-trekking-001',
    title: 'Eymir Gölü Doğa Yürüyüşü',
    community: {
      id: 'mock-comm-trekking',
      name: 'Doğa Sporları Topluluğu',
      category: 'Spor',
    },
    category: 'event',
    date: '2026-02-14',
    time: '08:00',
    location: 'Eymir Gölü Girişi',
    excerpt: 'Hafta sonu Eymir Gölü\'nde doğa ile iç içe keyifli bir yürüyüş etkinliği. Kahvaltı molası dahil.',
    description: `Doğa Sporları Topluluğu olarak düzenlediğimiz Eymir Gölü yürüyüşüne davetlisiniz!
    
    Program:
    - 08:00 Kampüsten hareket (Rektörlük önü)
    - 08:30 Eymir Gölü varış
    - 09:00 - 11:00 Yürüyüş parkuru
    - 11:30 Kahvaltı ve Çay molası
    - 13:00 Dönüş
    
    Rahat ayakkabılar giymeyi ve suyunuzu yanınıza almayı unutmayın. Ulaşım servislerle sağlanacaktır.`,
    image: '/images/trekking.jpg'
  },
  {
    id: 'mock-evt-blockchain-001',
    title: 'Blockchain 101: Web3 Dünyasına Giriş',
    community: {
      id: 'mock-comm-blockchain',
      name: 'Blockchain Topluluğu',
      category: 'Teknoloji',
    },
    category: 'workshop',
    date: '2026-02-18',
    time: '17:30',
    location: 'Kültür Kongre Merkezi - Salon C',
    excerpt: 'Blokzincir teknolojisinin temelleri, kripto paralar ve Web3 ekosistemi hakkında kapsamlı bir giriş semineri.',
    description: `Geleceğin teknolojisi Blockchain'i merak mı ediyorsunuz?
    
    Bu seminerde ele alınacak başlıklar:
    - Blockchain çalışma mantığı (Distributed Ledger)
    - Bitcoin ve Ethereum farkları
    - Akıllı Kontratlar (Smart Contracts)
    - NFT'ler ve Metaverse kavramları
    - DAO (Merkeziyetsiz Otonom Organizasyonlar)
    
    Hiçbir ön bilgi gerekmez. Teknoloji meraklısı herkesi bekliyoruz!`,
    image: '/images/blockchain.jpg'
  },
  {
    id: 'mock-evt-cats-001',
    title: 'Kampüs Patilerini Besleme Günü',
    community: {
      id: 'mock-comm-animals',
      name: 'Hayvan Dostları Topluluğu',
      category: 'Sosyal Sorumluluk',
    },
    category: 'event',
    date: '2026-02-20',
    time: '12:30',
    location: 'Kütüphane Arkası',
    excerpt: 'Kampüsümüzün sevimli sakinleri kedilerimizi ve köpeklerimizi hep birlikte besliyoruz. Mama desteği sağlayabilirsiniz.',
    description: `Havalar soğurken kampüs dostlarımızı unutmuyoruz!
    
    Hayvan Dostları Topluluğu olarak organize ettiğimiz besleme etkinliğinde kampüsün farklı noktalarındaki mama kaplarını dolduracağız ve hasta/bakıma muhtaç olanları kontrol edeceğiz.
    
    Destek olmak isterseniz yanınızda kedi/köpek maması getirebilir veya etkinlik alanındaki kumbaraya bağışta bulunabilirsiniz.
    
    Tüm hayvanseverleri bekliyoruz! 🐾`,
    image: '/images/cats.jpg'
  }
];
