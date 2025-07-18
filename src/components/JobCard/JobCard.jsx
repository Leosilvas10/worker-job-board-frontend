import React from 'react';

const JobCard = ({ job, onApplyClick }) => {
  // AJUSTE: Remove o nome da fonte do título (Catho, InfoJobs, etc)
  const rawTitle = job?.title || 'Título não informado';
  const cleanTitle = rawTitle.split(' - ')[0].trim();

  const companyName = typeof job?.company === 'string' ? job.company : (job?.company?.name || 'Empresa não informada');
  const location = job?.location || 'Local não informado';
  const salary = job?.salary || 'Salário a combinar';
  const type = job?.type || 'Tipo não informado';
  const description = job?.description || 'Descrição não disponível';
  const tags = job?.tags || [];
  const source = job?.source || '';
  const timeAgo = job?.timeAgo || 'Recente';

  return (
    <div className="job-card bg-white border border-govgray-200 rounded-lg p-6 hover:bg-govgray-50 transition-all duration-200 hover:border-govblue-600 hover:shadow-lg">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-govblue-600 rounded flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg" suppressHydrationWarning>
            {companyName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-govblue-800 mb-1 line-clamp-2" suppressHydrationWarning>
            {cleanTitle}
          </h3>
          <p className="text-govgray-600 text-sm mb-1 font-medium" suppressHydrationWarning>{companyName}</p>
          <div className="flex items-center gap-3 text-xs text-govgray-500 font-medium">
            <span suppressHydrationWarning>⏰ {timeAgo}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-govgreen-100 text-govgreen-700 text-sm rounded border border-govgreen-300 font-medium" suppressHydrationWarning>
          💰 {salary}
        </span>
        <span className="px-3 py-1 bg-govblue-100 text-govblue-700 text-sm rounded border border-govblue-300 font-medium" suppressHydrationWarning>
          ⏰ {type}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-govgray-700 text-sm line-clamp-3" suppressHydrationWarning>
          {description}
        </p>
      </div>

      {tags && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(tags) ? tags : String(tags).split(',')).slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-govgray-100 text-govgray-600 text-xs rounded border border-govgray-300" suppressHydrationWarning
              >
                {typeof tag === 'string' ? tag.trim() : tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-govgray-200 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-600" suppressHydrationWarning>
            📅 Recente
          </span>
          <span className="text-xs text-govgreen-600 font-bold" suppressHydrationWarning>
            ✅ Verificada
          </span>
        </div>
        <button
          onClick={() => onApplyClick(job)}
          className="w-full bg-govgreen-600 hover:bg-govgreen-700 text-white font-bold py-3 px-4 rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-md" suppressHydrationWarning
        >
          <span>Quero me candidatar</span>
          <span>🔗</span>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
