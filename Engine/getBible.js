import asv from '../TextSource/asv.json'
import kjv from '../TextSource/kjv.json'
import nbg from '../TextSource/pol_nbg.json'
import ubg from '../TextSource/pol_ubg.json'

const getBible = (version) => {
    switch (version){
        case 'asv': return asv
        case 'kjv': return kjv
        case 'nbg': return nbg
        case 'ubg': return ubg
        default: return kjv
    }
}
export default getBible