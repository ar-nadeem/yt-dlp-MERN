export default function Header({ visible, textLeft, textRight, textCenter }) {
  if (visible !== "false") {

    return (



      <header className="flex items-center justify-between py-1" style={{ backgroundColor: '#4a0511' }}>
        <h className="text-white p-3 text-lg font-bold" > {textLeft}</h>
        <h className="text-white p-3 text-lg font-bold" > {textCenter}</h>
        <a className="text-white p-3 text-lg font-bold underline italic hover:text-sky-700" href="https://www.linkedin.com/in/abdulrahman-nadeem/" rel="noreferrer" target="_blank">{textRight}</a>
      </header >



    );

  }
}   