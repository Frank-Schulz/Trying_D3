import React from 'react'
import ReactDOMServer from 'react-dom/server';

export function PersonBox(person) {
  const DOB = person.DOB
  const DOD = person.DOD


  const calcAge = () => {
    const ageDifMs = DOD ?
      new Date(DOD).getTime() - new Date(DOB).getTime() :
      new Date().getTime() - new Date(DOB).getTime();

    const ageDate = new Date(ageDifMs);
    return ageDate.getUTCFullYear() - 1970;
  }

  const humanDate = (date) => {
    return new Date(date).toJSON().slice(0, 10);
  }

  const ageDetails = {
    age: calcAge(),
    DOB: humanDate(DOB),
    DOD: humanDate(DOD),
    vitalStatus: DOD ?
      `Deceased` :
      `${calcAge() <= 0 ?
        'Unborn' :
        'Alive'}`
  }

  const color = () => {
    return person.DOD ?
      'red' : 'green';
  }

  return (
    ReactDOMServer.renderToStaticMarkup(
      <>
        {console.log(person)}
        <h6 style={{ textAlign: 'center' }}>{person.fullName}</h6>
        <table>
          {/* <th style={{ textAlign: 'center' }}>{person.fullName}</th> */}
          <tr>
            <td>Age:&emsp;</td>
            {ageDetails.vitalStatus === 'Deceased' && <td style={{ color: color() }} >Lived till {ageDetails.age}</td>}
            {ageDetails.vitalStatus != 'Deceased' && <td style={{ color: color() }}>{ageDetails.age} years old</td>}
          </tr>
          {ageDetails.age >= 14 && <tr>
            <td>G:</td>
            <td>{person.gender}</td>
          </tr>}
          <tr>
            <td>DOB:</td>
            <td>{ageDetails.DOB}</td>
            {/* {ageDetails.age > 0 && <td>{ageDetails.DOB}</td>} */}
            {ageDetails.age < 0 && <td>{ageDetails.vitalStatus}</td>}
          </tr>
          {person.DOD && <tr>
            <td>DOD:</td>
            <td>{ageDetails.DOD}</td>
          </tr>}
        </table>
      </>
    )
  )
}
