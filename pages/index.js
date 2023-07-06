import Head from 'next/head';
import RowBreak from '../components/rowBreak';

export default function Home() {
  return (
      <>
        <Head>
          <title>Nummi</title>
        </Head>
        <div className='reg-box'></div>
        <div className='form-box'></div>
        <div className='flex-wrapped' style={{justifyContent: 'center'}}>
          <RowBreak height={"4em"}></RowBreak>
          <h1 className="center-header">Nummi</h1>
          <RowBreak></RowBreak>
          <h2 className="center-header2">Algorithmic Trading Bots</h2>
          <RowBreak height={"4em"}></RowBreak>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla vulputate gravida. Integer tempus tortor sodales, vehicula nulla at, ullamcorper turpis. Duis facilisis varius nisl non volutpat. Duis at malesuada quam, eget semper massa. Maecenas pharetra quis nisl ac placerat. Donec porttitor convallis ligula, eu scelerisque lorem faucibus tincidunt. Suspendisse mollis, tellus nec facilisis interdum, lorem arcu fermentum enim, ut accumsan nibh felis in tellus. Nullam feugiat hendrerit odio, a laoreet mauris scelerisque a. Pellentesque nec efficitur nunc. Donec fringilla lobortis nisi ac tincidunt. Praesent dictum ante id vehicula convallis. Aliquam accumsan eros dictum nisi luctus dictum. Suspendisse vel dolor lectus. Pellentesque a facilisis elit. Duis sed velit pellentesque, congue odio et, sagittis metus. Phasellus pulvinar auctor nisi sit amet pretium.
          </p>
          {/* <button class="button">
            <span class="icon material-icons">settings</span>
            <span>Settings</span>
            <span className='loader'></span>
          </button> */}
        </div>
      </>
  );
}