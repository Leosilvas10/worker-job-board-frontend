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
        <HeroSection />
        {/* Bloco de Vagas em Destaque */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Vagas em Destaque</h2>
              {loading && (
                <div className="text-center text-blue-700 py-6">Carregando vagas em destaque...</div>
              )}
              {!loading && jobs.length === 0 && (
                <div className="text-center text-blue-700 py-6">Nenhuma vaga em destaque encontrada.</div>
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
                      <a className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 shadow-lg">
                        Ver Todas as Vagas →
                      </a>
                    </Link>
                  </div>
                </div>
              )}
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
