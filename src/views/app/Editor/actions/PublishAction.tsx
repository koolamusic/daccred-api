import {useWeb3ExecuteFunction} from 'react-moralis'
import dacredRouterABI from '~/sol/artifacts/DacredRouter'


export default function PublishAction(): JSX.Element {
  console.log(dacredRouterABI)
  
    const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
      abi: dacredRouterABI,
      contractAddress: '0x195c499669Ed02E9313e94836A2dCf9500322532',
      functionName: "createContractForClient",
      params: {
        secondsAgos: ['Fall Contract', 'FXCVIA'],
      },
    });
  
    return (<div>
      {error && <h6>{JSON.stringify(error)}</h6>}
      <button onClick={() => fetch()} disabled={isFetching}>Fetch data</button>
      {data && <pre>{JSON.stringify(data,null,2)}</pre>}
    </div>)
  }
  


//   import {useWeb3ExecuteFunction} from 'react-moralis'
// import dacredRouterABI from '@/lib/abis/dacredRouter'


// export default function PublishAction(): JSX.Element {

//   console.log(dacredRouterABI)
//     const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
//       abi: dacredRouterABI,
//       contractAddress: '0x195c499669Ed02E9313e94836A2dCf9500322532',
//       functionName: "createContractForClient",
//       params: {
//         secondsAgos: ['Fall Contract', 'FXCVIA'],
//       },
//     });
  
//     return (<div>
//       {error && <h6>{JSON.stringify(error)}</h6>}
//       <button onClick={() => fetch()} disabled={isFetching}>Fetch data</button>
//       {data && <pre>{JSON.stringify(data,null,2)}</pre>}
//     </div>)
//   }
  