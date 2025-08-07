import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'


export const config = createConfig({
  chains: [sepolia],
  connectors: [],
  transports: {
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/MmeeikFI32X3D30PvPBHhRZvYx2Ewikf"),
  },
})
