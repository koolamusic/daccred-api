import dacredRouterABI from './daccredRouter.json';
import leanRouterABI from './leanRouter.json';
import daccredFactoryABI from './daccredFactory.json';

const ABIS = {
  dacredRouterABI: dacredRouterABI.abi,
  leanRouter: leanRouterABI.output.abi,
  daccredFactory: daccredFactoryABI,
};

export default ABIS;
