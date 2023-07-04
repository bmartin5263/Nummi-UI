import Document, { Html, Head, Main, NextScript } from 'next/document'
 
class MyDocument extends Document {
  static async getInitialProps(context) { 
    const initialProps = await Document.getInitialProps(context)
    const theme = context?.req?.cookies["Theme"];
  
    // const cookieList = cookies();
  
    const x = {
      ...initialProps,
      // session,
      theme: theme
    };
  
    return x;
   }
 
  render() {
    return (
      <Html>
        <Head />
        <body className={this.props.theme == "dark" ? "dark" : ""}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
 
export default MyDocument