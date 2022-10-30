/**
 * This file provides a context and a reducer to manage an election
 */
import {createContext, useContext, useReducer, useEffect} from 'react';
import {useRouter} from "next/router";
import {DEFAULT_NUM_GRADES} from '@services/constants';

// Store data about an election
const ElectionContext = createContext(null);
// Store the dispatch function that can modify an election
const ElectionDispatchContext = createContext(null);



export function ElectionProvider({children}) {
  /**
   * Provide the election and the dispatch to all children components
   */
  const [election, dispatch] = useReducer(
    electionReducer,
    initialElection
  );

  // At the initialization, set the title using GET param
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;

    dispatch({
      'type': 'set',
      'field': 'title',
      'value': router.query.title || ""
    })
  }, [router.isReady]);


  return (
    <ElectionContext.Provider value={election}>
      <ElectionDispatchContext.Provider
        value={dispatch}
      >
        {children}
      </ElectionDispatchContext.Provider>
    </ElectionContext.Provider>
  );
}

export function useElection() {
  /**
   * A simple hook to read the election
   */
  return useContext(ElectionContext);
}

export function useElectionDispatch() {
  /**
   * A simple hook to modify the election
   */
  return useContext(ElectionDispatchContext);
}

function electionReducer(election, action) {
  /** 
   * Manage all types of action doable on an election
   */
  switch (action.type) {
    case 'set': {
      election[action.field] = action.value;
      return election;
    }
    case 'commit': {
      throw Error('Not implemented yet')
    }
    case 'remove': {
      throw Error('Not implemented yet')
    }
    case 'candidate-push': {
      const candidate = action.value === 'default' ? {...defaultCandidate} : action.value;
      election.candidates.push(candidate)
      return election;
    }
    case 'candidate-rm': {
      if (typeof action.value !== "number") {
        throw Error(`Unexpected candidate position ${action.value}`)
      }
      election.candidates.split(action.value)
      return election;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

const defaultCandidate = {
  name: "",
  description: "",
  active: false,
}

const initialElection = {
  title: "",
  description: "",
  candidates: [{...defaultCandidate}, {...defaultCandidate}],
  grades: DEFAULT_NUM_GRADES,
  isTimeLimited: false,
  isRandomOrder: false,
  restrictResult: false,
  restrictVote: false,
  startVote: null,
  endVote: null,
  emails: [],
};


//  const checkFields = () => {
//    const numCandidates = candidates ? candidates.filter(c => c.label !== '') : 0;
//    if (numCandidates < 2) {
//      return {ok: false, msg: 'error.at-least-2-candidates'};
//    }
//
//    if (!title || title === "") {
//      return {ok: false, msg: 'error.no-title'};
//    }
//
//    return {ok: true, msg: "OK"};
//  };
//
//  const handleSubmit = () => {
//    const check = checkFields();
//    if (!check.ok) {
//      toast.error(t(check.msg), {
//        position: toast.POSITION.TOP_CENTER,
//      });
//      return;
//    }
//
//    setWaiting(true);
//
//    createElection(
//      title,
//      candidates.map((c) => c.label).filter((c) => c !== ""),
//      {
//        mails: emails,
//        numGrades,
//        start: start.getTime() / 1000,
//        finish: finish.getTime() / 1000,
//        restrictResult: restrictResult,
//        restrictVote: restrictVote,
//        locale: router.locale.substring(0, 2).toLowerCase(),
//      },
//      (result) => {
//        if (result.id) {
//          router.push(`/new/confirm/${result.id}`);
//        } else {
//          toast.error(t("Unknown error. Try again please."), {
//            position: toast.POSITION.TOP_CENTER,
//          });
//          setWaiting(false);
//        }
//      }
//    );
//  };