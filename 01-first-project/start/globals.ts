import edge from 'edge.js'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as phIcons } from '@iconify-json/ph'

addCollection(phIcons)

edge.use(edgeIconify)

// This allows us to share information to all requests, meaning app-wide information or config may be shared this way
edge.global('globalExample', 'Global Info')
