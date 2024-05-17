// import * as React from 'react';
//
// export default class AuthContent extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: []
//         }
//     };
//
//
//     render() {
//         return (
//             <div className="row justify-content-md-center">
//                 <div className="col-4">
//                     <div className="card" style={{width: "18rem"}}>
//                         <div className="card-body">
//                             <h5 className="card-title">Backend response</h5>
//                             <p className="card-text">Content:</p>
//                             <ul>
//                                 {this.state.data && this.state.data
//                                     .map((line) =>
//                                         <li key={line}>{line}</li>
//                                     )
//                                 }
//                             </ul>
//                             <tbody>
//                             {this.state.data && this.state.data
//                                 .map((line) => (
//                                     <tr key={line.id}>
//                                         <td>{line.numberScore}</td>
//                                         <td>{line.nameTransaction}</td>
//                                         <td>{line.sum}</td>
//                                         <td>{line.typeTransaction}</td>
//                                         <td>{line.dateTransaction}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     };
// }