import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSiteContext } from '../src/contexts/SiteContext'
import HeroSection from '../src/components/HeroSection/HeroSection'
import LeadModal from '../src/components/LeadModal.jsx'
import JobCard from '../src/components/JobCard/JobCard'

export default function Home() {
  const { siteConfig } = useSiteContext()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

  // Adicione sua lógica de fetch de jobs e handlers do modal aqui, se precisar.

  return (
    <>
      <Head>
        <title>Encontre a Sua Vaga Ideal e Conheça Seus Direitos! | Site do Trabalhador</title>
        <meta name="description" content="Milhares de vagas de empregos simples te esperam! Doméstica, Cuidador(a), Porteiro, Limpeza e muito mais. Aprenda seus direitos trabalhistas de forma fácil e gratuita." />
        <meta name="keywords" content="vagas de emprego, direitos trabalhistas, calculadora trabalhista, trabalho doméstico, cuidador, porteiro, limpeza" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://sitedotrabalhador.com.br" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sitedotrabalhador.com.br/" />
      </Head>
      <main className="min-h-screen">
        <HeroSection />
        <section className="bg-blue-600 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Será que Seus Direitos Estão Sendo Respeitados? Descubra Agora!
              </h1>
              <div className="bg-blue-500/30 rounded-xl p-8 mb-8">
                <p className="text-lg text-white mb-6 leading-relaxed">
                  Você trabalhou duro, mas tem dúvidas se recebeu <strong>tudo que era seu por direito?</strong> FGTS, seguro-desemprego, horas extras, rescisão... Infelizmente, <span className="text-yellow-300 font-bold">muitos trabalhadores perdem dinheiro</span> simplesmente por falta de informação. <span className="text-yellow-300 font-bold">Não deixe isso acontecer com você!</span>
                </p>
                <p className="text-lg mb-6 text-white">
                  Use nossa <strong>Calculadora de Direitos Trabalhistas GRATUITA</strong> e tenha uma estimativa clara do que te pertence. É uma ferramenta rápida, fácil de usar e totalmente segura. <span className="text-yellow-300 font-bold">Proteja seu futuro financeiro e garanta o que é justo!</span>
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg">
                  🧮 Calcular Meus Direitos →
                </button>
                <div className="flex justify-center gap-6 mt-6">
                  <span className="text-green-300 font-bold">✅ 100% Gratuito</span>
                  <span className="text-green-300 font-bold">✅ Resultados Imediatos</span>
                  <span className="text-green-300 font-bold">✅ Dados Protegidos</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">25K+</div>
                  <div className="text-sm">Cálculos Realizados</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">R$ 2.8M</div>
                  <div className="text-sm">Recuperados pelos Usuários*</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">4.9 ⭐</div>
                  <div className="text-sm">Avaliação dos Usuários</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center justify-center gap-2">
                <span className="inline-block align-middle text-4xl">📞</span> Entre em Contato
              </h2>
              <p className="text-lg text-blue-700 mb-8">
                Tem dúvidas sobre direitos trabalhistas, problemas com vagas ou sugestões? Nossa equipe está pronta para ajudar você.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 rounded-2xl p-8 shadow-xl border border-blue-100 flex flex-col gap-6 justify-center">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="bg-white rounded-full p-3 shadow text-2xl">📧</span>
                    <div className="text-left">
                      <div className="font-bold text-blue-900">Email</div>
                      <div className="text-blue-700 text-sm">contato@sitedotrabalhador.com.br</div>
                      <div className="text-blue-700 text-sm">suporte@sitedotrabalhador.com.br</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="bg-white rounded-full p-3 shadow text-2xl">📱</span>
                    <div className="text-left">
                      <div className="font-bold text-blue-900">WhatsApp</div>
                      <div className="text-blue-700 text-sm">(11) 99999-9999</div>
                      <div className="text-blue-700 text-sm">Seg. a Sex. 9h às 18h</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-white rounded-full p-3 shadow text-2xl">📍</span>
                    <div className="text-left">
                      <div className="font-bold text-blue-900">Endereço</div>
                      <div className="text-blue-700 text-sm">São Paulo - SP, Brasil</div>
                      <div className="text-blue-700 text-sm">Atendimento 100% digital</div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-8 shadow-xl border border-blue-100">
                  <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✉️</span> Envie sua Mensagem
                  </h3>
                  <form className="space-y-5 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Nome *</label>
                        <input type="text" className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm" placeholder="Seu nome completo" required />
                      </div>
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Email *</label>
                        <input type="email" className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm" placeholder="seu@email.com" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-blue-900 font-semibold mb-2">Assunto *</label>
                      <select className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm" required>
                        <option value="">Selecione o assunto</option>
                        <option value="duvidas">Dúvidas sobre direitos</option>
                        <option value="vaga">Problemas com vagas</option>
                        <option value="sugestao">Sugestão</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-blue-900 font-semibold mb-2">Mensagem *</label>
                      <textarea className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none transition-all duration-200 shadow-sm" placeholder="Descreva sua mensagem detalhadamente..." required />
                    </div>
                    <div className="flex items-center mb-2">
                      <input type="checkbox" className="form-checkbox text-green-600 focus:ring-green-500" id="lgpd" required />
                      <label htmlFor="lgpd" className="ml-2 text-blue-900 text-sm">Aceito o tratamento dos meus dados conforme a <a href="#" className="underline">Política de Privacidade</a> e LGPD.</label>
                    </div>
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg text-base flex items-center justify-center gap-2">
                      <span className="text-2xl">📩</span> Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Coloque aqui outros blocos/componentes da página */}
        {/* Modal de candidatura */}
        {showModal && (
          <LeadModal job={selectedJob} onClose={() => setShowModal(false)} />
        )}
      </main>
    </>
  )
}
