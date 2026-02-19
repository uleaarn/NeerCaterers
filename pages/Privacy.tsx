
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="pt-20 bg-[#F6F6F4] min-h-screen animate-in fade-in duration-700">
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C6A15B] mb-6 block">Operational Governance</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1C1C1C]">Privacy Policy</h1>
        </div>

        <div className="bg-white p-12 md:p-16 border border-[#C6A15B]/10 shadow-sm space-y-12 text-sm font-light text-[#7A7A7A] leading-relaxed">
          <div className="space-y-4">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold">Collection of Personal Information</h2>
            <p>
              Neer Caterers collects personally identifiable information, such as your name, professional email address, and primary contact number, specifically when you utilize our formal consultation inquiry protocols or engage with our digital concierge. We also collect specific logistical data points including proposed event dates, guest volume estimates, geographic venue locations, and culinary pillars of interest to facilitate our comprehensive production modeling.
            </p>
            <p>
              While our current digital presence does not facilitate direct financial transactions, billing information may be required and collected during the formal contract phase of our engagement. Neer Caterers reserves the right to collect additional information in the future as our operational requirements evolve to better serve our executive clientele.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold">Information Collected Automatically</h2>
            <p>
              To maintain the technical integrity and performance of our digital infrastructure, Neer Caterers automatically collects certain technical data points. This information may include your IP address, browser classification, domain names, access timestamps, and referring website addresses. This data is utilized exclusively for the operation of our digital services, the maintenance of service quality, and to provide internal analytical insights regarding the use of the Neer Caterers website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold">Use of Personal Information</h2>
            <p>
              Neer Caterers utilizes your personal information to operate its website and deliver the specialized catering services you have requested. We use your data to respond to formal inquiries, provide tailored culinary strategy, and maintain rigorous internal communications regarding your event production. We may also utilize your personally identifiable information to inform you of specialized service offerings or logistical updates from Neer Caterers and its authorized affiliates.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold">Sharing of Personal Information</h2>
            <p>
              Neer Caterers maintains a strict policy against the sale, rental, or leasing of customer data to third parties. We may share information with trusted operational service providers to facilitate statistical analysis, manage postal or electronic correspondence, or coordinate logistics for event deliveries. All such third-party partners are strictly prohibited from utilizing your personal information for any purpose outside of providing these specific services to Neer Caterers, and they are contractually required to maintain the absolute confidentiality of your data.
            </p>
            <p>
              Neer Caterers will disclose your personal information, without prior notice, only if required to do so by law or in the good faith belief that such action is necessary to comply with legal mandates, protect the rights or property of Neer Caterers, or act under exigent circumstances to protect the personal safety of our users or the public.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold">Tracking Technologies and Cookies</h2>
            <p>
              The Neer Caterers website utilizes cookies and similar anonymous identifiers to optimize the user experience. Cookies are unique text files placed on your local hardware by our web servers to facilitate personalization and analytics. We utilize industry-recognized tools, such as Google Analytics, to monitor site performance and user engagement patterns. You retain the capability to accept or decline cookies through your browser settings, though declining may limit your access to certain interactive features of our consultation tools.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold">Security of Personal Information</h2>
            <p>
              Neer Caterers implements reasonable administrative, technical, and physical safeguards to secure your personal information from unauthorized access, use, or disclosure. While we maintain a high standard of data protection, no digital transmission or electronic storage system can be guaranteed to be absolutely secure. Consequently, Neer Caterers cannot offer an absolute guarantee of total security.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold">Children Under Thirteen</h2>
            <p>
              Neer Caterers does not intentionally collect personally identifiable information from individuals under the age of thirteen. Our services and digital presence are intended for professional adult audiences. If you are under the age of thirteen, you must obtain the consent of a parent or guardian before utilizing this website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold">Changes to This Privacy Policy</h2>
            <p>
              Neer Caterers will periodically update this Privacy Protocol to reflect operational changes and feedback from our clients. We encourage all users to review this policy periodically to remain informed of our data protection methodologies. Your continued use of the site following the implementation of updates will constitute your acknowledgment of and agreement to the modified policy.
            </p>
          </div>

          <div className="pt-8 border-t border-[#F6F6F4]">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#1C1C1C] font-semibold mb-6">Contact Information</h2>
            <p className="mb-6">
              Neer Caterers welcomes inquiries regarding this Privacy Policy. If you have concerns regarding our adherence to this protocol, please contact our administrative office:
            </p>
            <div className="flex flex-col space-y-2 text-[#1C1C1C]">
              <span className="font-serif italic text-base">Neer Caterers Production Group</span>
              <span className="text-[11px] tracking-widest uppercase">Montclair, New Jersey</span>
              <span className="text-[11px] tracking-widest uppercase">Email: events@neercaterers.com</span>
              <span className="text-[11px] tracking-widest uppercase">Phone: 551.380.8009</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
