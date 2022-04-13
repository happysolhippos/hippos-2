import React, { Component } from 'react'
import {Connection, clusterApiUrl, PublicKey} from "@solana/web3.js";
import {Metadata} from "@metaplex-foundation/mpl-token-metadata";
import wlist from "../assets/wl.json";

type Props = {}

type State = {}

async function run() {

  if((window.top as any).phantom.solana.isPhantom) {

    const user_mints: any[] = [];

    const res = await (window.top as any).phantom.solana.connect();
    const wallet = (window.top as any).phantom.solana.publicKey.toString();
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    const response =  await connection.getParsedTokenAccountsByOwner(new PublicKey(wallet), {programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")}, "confirmed");

    for(let i=0; i < response.value.length; i++) {
      if(wlist.includes(response.value[i].account.data.parsed.info.mint)) {
        user_mints.push(response.value[i].account.data.parsed.info.mint);
      }
    }

    const button = document.getElementById('btnConnect');

    button!.style.display = 'none';

    for(let mint of user_mints) {
      let btn = document.createElement("button");
      btn.innerHTML = mint;
      document.body.appendChild(btn);
    }
  }
}

export default class Main extends Component<Props, State> {
  state = {}

  render() {
    return (
      <button id="btnConnect" onClick={run}>Connect</button> 
    )
  }
}