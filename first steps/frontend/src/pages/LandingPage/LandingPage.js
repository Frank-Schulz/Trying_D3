import './LandingPage.css';
import React, { useState, useEffect } from 'react'
import * as d3 from "d3";
import axios from 'axios';
import Loading from '../../components/Loading';
import { Chart } from '../../components/Charts/index';
import Test1 from '../../components/test/Test1';
import Test3 from '../../components/test/Test3';
import Reference from '../../components/Charts/Type/reference';


function LandingPage() {
  const [ ancestry, setAncestry ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ treeRoot, SetTreeRoot ] = useState(null);

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const getAncestry = async () => {
    setLoading(true);
    const { data } = await axios.get(`/index`);
    setAncestry(data)
    setLoading(false);
  }

  // const invertCoords = (x, y) => {
  //   return `${x *= -1},${y *= -1}`
  // }

  async function stratifyData() {
    setLoading(true);

    const { data } = await axios.get(`/index`);

    var stratify = d3.stratify()
      .parentId((d) => {
        return d.path.substring(0, d.path.lastIndexOf("\\"));
      })
      .id((d) => { return d.path; });

    var root = stratify(data);

    root.sum((d) => {
      return +d.size;
    })
      .sort((a, b) => {
        return b.height - a.height || b.value - a.value;
      });

    SetTreeRoot(root);
    setLoading(false);
  }

  useEffect(() => {
    stratifyData();
  }, [])


  return (
    <div className='landing'>
      <h2>LandingPage</h2>
      {/* <Reference treeRoot={treeRoot} /> */}
      {loading && <Loading />}

      {!loading && <div>
        {/* {!ancestry && <button onClick={getAncestry}> Get Ancestry </button>}
        {!treeRoot && ancestry && <button onClick={stratifyData}> Stratify Data </button>} */}
        {treeRoot && <Chart
          width={600}
          height={600}
          margin={{
            left: 20,
            top: 20,
            right: 20,
            bottom: 20
          }}
          data={{
            columns: [ [ 0 ] ],
            treeRoot: treeRoot,
            type: 'tree',
          }}
        />}
      </div>}


      {/* <p>{invertCoords(-5, 5)}</p>

      <svg id='petal' width="100" height="100" style={{ overflow: "visible", margin: "5px" }}>
        <path d='M0,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 0,0'
          fill='none' stroke='#000' strokeWidth="2" transform='translate(50,0)' />
      </svg>
      <svg width="100" height="100" style={{ overflow: "visible", margin: "5px" }}>
        <path d='M-20,0 L-20,40 M20,0 L20,40 M-40,50 C-20,70 20,70 40,50'
          fill='none' stroke='#000' strokeWidth="2" transform='translate(50,0)' />
      </svg> */}

    </div>
  )
}

export default LandingPage
