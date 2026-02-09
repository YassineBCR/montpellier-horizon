export function StatsBanner() {
  return (
    <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-6 flex justify-around text-center shadow-lg transform -translate-y-4">
      <div>
        <div className="text-3xl font-bold text-emerald-600">342</div>
        <div className="text-sm text-gray-500 font-medium">Citoyens</div>
      </div>
      <div className="w-px bg-gray-200"></div>
      <div>
        <div className="text-3xl font-bold text-emerald-600">18</div>
        <div className="text-sm text-gray-500 font-medium">Propositions</div>
      </div>
      <div className="w-px bg-gray-200"></div>
      <div>
        <div className="text-3xl font-bold text-emerald-600">5</div>
        <div className="text-sm text-gray-500 font-medium">Quartiers</div>
      </div>
    </div>
  )
}