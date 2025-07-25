

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
  
  // Estados para o formulário de contato
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/api/featured-jobs')
      .then(res => res.json())
      .then(data => {
        // Remove vagas mock/teste e oculta campo "source"
        const filtered = (data.data || []).filter(
          job =>
            !(job.tags && job.tags.some(tag => tag.toLowerCase().includes('mock') || tag.toLowerCase().includes('teste')))
        )
        // Remove repetidas por ID (garante só 1 vaga por id)
        const unique = []
        const seen = new Set()
        for (const vaga of filtered) {
          if (!seen.has(vaga.id)) {
            unique.push(vaga)
            seen.add(vaga.id)
          }
        }
        setJobs(unique.map(({ source, ...rest }) => rest))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Função para abrir o modal (passa a vaga selecionada)
  const handleOpenModal = (job) => {
    setSelectedJob(job)
    setShowModal(true)
  }

  // Fecha o modal e reseta a vaga selecionada
  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedJob(null)
  }

  // Função para lidar com mudanças no formulário
  const handleContactFormChange = (e) => {
    const { name, value } = e.target
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Função para enviar o formulário de contato
  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulação
      alert('Mensagem enviada com sucesso!')
      setContactForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      alert('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Encontre a Sua Vaga Ideal e Conheça Seus Direitos! | Site do Trabalhador</title>
        <meta name="description" content="Milhares de vagas de empregos simples te esperam! Doméstica, Cuidador(a), Porteiro, Limpeza e muito mais. Aprenda seus direitos trabalhistas de forma fácil e gratuita." />
        <meta name="keywords" content="vagas de emprego, direitos trabalhistas, calculadora trabalhista, trabalho doméstico, cuidador, porteiro, limpeza" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://sitedotrabalhador.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sitedotrabalhador.com.br/" />
      </Head>
      
      <main className="min-h-screen">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Bloco de Vagas em Destaque - PRIMEIRO */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-govblue-900 mb-6 text-center">Vagas em Destaque</h2>
              {loading && (
                <div className="text-center text-govblue-700 py-6">Carregando vagas em destaque...</div>
              )}
              {!loading && jobs.length === 0 && (
                <div className="text-center text-govblue-700 py-6">Nenhuma vaga em destaque encontrada.</div>
              )}
              {!loading && jobs.length > 0 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map(job => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onApplyClick={() => handleOpenModal(job)}
                      />
                    ))}
                  </div>
                  {/* CTA Ver Todas as Vagas */}
                  <div className="flex justify-center mt-10">
                    <Link href="/vagas" legacyBehavior>
                      <a className="bg-govgreen-600 hover:bg-govgreen-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 shadow-lg">
                        Ver Todas as Vagas →
                      </a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. Bloco Direitos Trabalhistas - DEPOIS DAS VAGAS */}
        <section className="bg-gradient-to-br from-govblue-600 to-govblue-800 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Ícone de alerta */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-govyellow-400 rounded-full">
                  <svg className="w-8 h-8 text-govblue-800" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-4">
                Será que Seus Direitos Estão Sendo Respeitados?
              </h2>
              <h3 className="text-xl mb-8 text-govyellow-200">
                Descubra Agora!
              </h3>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 mb-8">
                <p className="text-lg mb-6">
                  Você trabalhou duro, mas tem dúvidas se recebeu <strong className="text-govyellow-300">tudo que era seu por direito?</strong> FGTS, seguro-desemprego, horas extras, rescisão... Infelizmente, <strong className="text-govyellow-300">muitos trabalhadores perdem dinheiro</strong> simplesmente por falta de informação. <strong className="text-govyellow-300">Não deixe isso acontecer com você!</strong>
                </p>
                
                <p className="text-base mb-6">
                  Use nossa <strong className="text-govyellow-300">Calculadora de Direitos Trabalhistas GRATUITA</strong> e tenha uma estimativa clara do que te pertence. É uma ferramenta rápida, fácil de usar e totalmente segura. <strong className="text-govyellow-300">Proteja seu futuro financeiro e garante o que é justo!</strong>
                </p>

                {/* Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-govyellow-300 mb-1">25K+</div>
                    <div className="text-sm">Cálculos Realizados</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-govyellow-300 mb-1">R$ 2.8M</div>
                    <div className="text-sm">Recuperados pelos Usuários*</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-govyellow-300 mb-1">4.9 ⭐</div>
                    <div className="text-sm">Avaliação dos Usuários</div>
                  </div>
                </div>

                {/* Badges de Proteção */}
                <div className="flex justify-center items-center space-x-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-govgreen-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">100% Gratuito</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-govgreen-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">Resultados Imediatos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-govgreen-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">Dados Protegidos</span>
                  </div>
                </div>

                <Link href="/calculadora" legacyBehavior>
                  <a className="inline-block bg-govgreen-600 hover:bg-govgreen-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    ⚡ Calcular Meus Direitos →
                  </a>
                </Link>
              </div>

              <p className="text-sm text-govyellow-200">
                *Estatísticas baseadas em dados de usuários que utilizaram nossa calculadora
              </p>
            </div>
          </div>
        </section>

        {/* 4. Bloco Para Empresas - Verde */}
        <section className="bg-gradient-to-br from-govgreen-600 to-govgreen-800 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Ícone */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full">
                  <svg className="w-8 h-8 text-govgreen-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-6">
                🏢 Sua Empresa Precisa de Talentos?
              </h2>
              
              <p className="text-xl mb-8">
                Conecte-se diretamente com milhares de profissionais qualificados que estão procurando uma oportunidade! Domésticas, porteiros, cuidadores, auxiliares de limpeza, motoristas e muito mais.
              </p>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">Por que escolher o Site do Trabalhador para encontrar seus funcionários?</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-govyellow-400 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-govgreen-800" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-govyellow-200">Candidatos Verificados:</h4>
                      <p className="text-sm">Profissionais com experiência real</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-govyellow-400 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-govgreen-800" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-govyellow-200">Resultados Rápidos:</h4>
                      <p className="text-sm">Receba candidatos em 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-govyellow-400 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-govgreen-800" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-govyellow-200">Publicação Gratuita:</h4>
                      <p className="text-sm">Anuncie sua vaga sem custos</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-govyellow-400 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-govgreen-800" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-govyellow-200">Suporte Dedicado:</h4>
                      <p className="text-sm">Nossa equipe te ajuda a encontrar o profissional ideal</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <Link href="/para-empresas" legacyBehavior>
                  <a className="inline-block bg-govyellow-400 hover:bg-govyellow-500 text-govgreen-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    📝 PUBLIQUE SUA VAGA GRATUITAMENTE →
                  </a>
                </Link>
              </div>

              <div className="text-sm">
                <p className="mb-2">Junte-se a centenas de empresas que já encontraram seus funcionários conosco!</p>
                <div className="flex justify-center space-x-8 text-xs">
                  <span>✅ Cadastro Rápido</span>
                  <span>✅ Sem Taxas Ocultas</span>
                  <span>✅ Candidatos Qualificados</span>
                  <span>✅ Atendimento Personalizado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Bloco de Contato */}
        <section className="bg-govgray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-govgray-900 mb-4">
                  Tem dúvidas sobre direitos trabalhistas, problemas com vagas ou sugestões?
                </h2>
                <p className="text-lg text-govgray-600">
                  Nossa equipe está pronta para ajudar você.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Informações de Contato */}
                <div>
                  <h3 className="text-2xl font-bold text-govgray-900 mb-6">Fale Conosco</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-govblue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-govgray-900">Email</h4>
                        <p className="text-govgray-600">contato@sitedotrabalhador.com.br</p>
                        <p className="text-sm text-govgray-500">suporte@sitedotrabalhador.com.br</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-govgreen-600 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-govgray-900">WhatsApp</h4>
                        <p className="text-govgray-600">(11) 99999-9999</p>
                        <p className="text-sm text-govgray-500">Seg a Sex das 8h às 18h</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-govyellow-500 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-govgray-900" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-govgray-900">Endereço</h4>
                        <p className="text-govgray-600">São Paulo - SP, Brasil</p>
                        <p className="text-sm text-govgray-500">Atendimento 100% digital</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulário de Contato */}
                <div>
                  <h3 className="text-2xl font-bold text-govgray-900 mb-6">Envie sua Mensagem</h3>
                  
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-govgray-700 mb-2">
                          Nome *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={contactForm.name}
                          onChange={handleContactFormChange}
                          required
                          className="form-input"
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-govgray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleContactFormChange}
                          required
                          className="form-input"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-govgray-700 mb-2">
                        Assunto *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactFormChange}
                        required
                        className="form-input"
                      >
                        <option value="">Selecione o assunto</option>
                        <option value="duvida-direitos">Dúvida sobre Direitos Trabalhistas</option>
                        <option value="problema-vaga">Problema com Vaga</option>
                        <option value="sugestao">Sugestão</option>
                        <option value="parceria">Parceria/Empresa</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-govgray-700 mb-2">
                        Mensagem *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={contactForm.message}
                        onChange={handleContactFormChange}
                        required
                        className="form-input resize-none"
                        placeholder="Descreva sua mensagem detalhadamente..."
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="w-4 h-4 text-govblue-600 border-govgray-300 rounded focus:ring-govblue-500"
                      />
                      <label htmlFor="terms" className="text-sm text-govgray-600">
                        Aceito o tratamento dos meus dados conforme a{' '}
                        <Link href="/politica-privacidade" legacyBehavior>
                          <a className="text-govblue-600 hover:text-govblue-700 underline">
                            Política de Privacidade
                          </a>
                        </Link>{' '}
                        e{' '}
                        <Link href="/termos" legacyBehavior>
                          <a className="text-govblue-600 hover:text-govblue-700 underline">
                            Termos
                          </a>
                        </Link>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando Mensagem...
                        </span>
                      ) : (
                        '✉️ Enviar Mensagem'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal de candidatura */}
        {showModal && selectedJob && (
          <LeadModal isOpen={showModal} onClose={handleCloseModal} vaga={selectedJob} />
        )}
      </main>
    </>
  )
}
