import { useParams, Navigate } from 'react-router-dom'
import { getCategory } from '../data/categories'
import { CategoryHero, CorePillars, ProductHighlights, CategoryWhoFor, FAQ, GetInTouch } from '../components/sections'
import Seo from '../components/Seo'

export default function ServiceCategory() {
  const { slug } = useParams()
  const cat = getCategory(slug)
  if (!cat) return <Navigate to="/services" replace />
  return (
    <>
      <Seo
        title={`${cat.label} | Indro Labs`}
        description={cat.body}
        path={`/services/${cat.slug}`}
      />
      <CategoryHero cat={cat} />
      <div className="sections-wrap">
        <CorePillars cat={cat} />
        <ProductHighlights cat={cat} />
        <CategoryWhoFor cat={cat} />
        <FAQ />
        <GetInTouch />
      </div>
    </>
  )
}
