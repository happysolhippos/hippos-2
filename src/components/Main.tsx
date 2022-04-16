import React, { Component } from 'react'
import {Connection, clusterApiUrl, PublicKey} from "@solana/web3.js";
import {Metadata} from "@metaplex-foundation/mpl-token-metadata";
import wlist from "../assets/wl.json";

type Props = {}

type State = {}

async function exchange() {}

async function run() {

  if((window.top as any).phantom.solana.isPhantom) {

    const user_mints: any[] = [];

    const res = await (window.top as any).phantom.solana.connect();
    const wallet = (window.top as any).phantom.solana.publicKey.toString();
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    const response =  await connection.getParsedTokenAccountsByOwner(new PublicKey(wallet), {programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")}, "confirmed");

    for(let i=0; i < response.value.length; i++) {
      if(wlist.includes(response.value[i].account.data.parsed.info.mint)) {
        if(response.value[i].account.data.parsed.info.tokenAmount.amount === "1") {
          console.log(response.value[i].pubkey.toString());
          user_mints.push(response.value[i].account.data.parsed.info.mint);
        }
      }
    }

    const button = document.getElementById('btnConnect');

    button!.style.display = 'none';

    var selectForm = document.getElementById("selectForm");
    selectForm!.removeAttribute("hidden");
    for(let mint of user_mints) {
      var checkbox = document.createElement('input');
      var label = document.createElement('label');
      var br = document.createElement('br');

      checkbox.setAttribute("id", mint);
      checkbox.setAttribute("type", "checkbox");

      label.setAttribute("for", mint);
      label.innerHTML = mint;
      selectForm!.appendChild(checkbox);
      selectForm!.appendChild(label);
      selectForm!.appendChild(br);
    }

  }
}

export default class Main extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
      <button id="btnConnect" onClick={run}>Connect</button>

      <form id="selectForm" hidden>

        <br /><button type="submit" id="btnSubmit" onClick={exchange} >Exchange</button>
      </form>
    </>
    )
  }
}