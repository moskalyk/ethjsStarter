import { DefaultStateManager } from "../ethereumjs-monorepo/packages/statemanager/dist/cjs/index";

import { Trie } from '../ethereumjs-monorepo/packages/trie/dist/cjs/index'
import { Account, Address, bytesToHex, hexToBytes, intToBytes, setLengthLeft } from '../ethereumjs-monorepo/packages/util/dist/cjs/index'

const main = async () => {
    const trie = await Trie.create({ useKeyHashing: false })
    const sm = new DefaultStateManager({ trie })
    const pk = hexToBytes('0x9f12aab647a25a81f821a5a0beec3330cd057b2346af4fb09d7a807e896701ea')
    const address = Address.fromPrivateKey(pk)
    const account = new Account()
    await sm.putAccount(address, account)
    await sm.putContractStorage(address, setLengthLeft(intToBytes(0),32), intToBytes(32))
    const storage = await sm.dumpStorage(address)
    const keys = Object.keys(storage)
    const proof = await sm.getProof(address, keys.map(key => hexToBytes(key)))
    const newTrie = (await Trie.createFromProof(
        proof.accountProof.map((e) => hexToBytes(e)),
        { useKeyHashing: false }
      ))
    const partialSM = await DefaultStateManager.fromProof(proof, false,  { trie: newTrie})
    console.log(await partialSM.getAccount(address))
    console.log(await partialSM.getContractStorage(address, hexToBytes(keys[0])))
}

main()