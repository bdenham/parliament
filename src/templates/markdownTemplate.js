/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { graphql } from "gatsby"
import DocLayout from "../components/doclayout"
import Heading from "@react/react-spectrum/Heading"
import { Feedback, Footer } from "@parliament/parliament-ui-components"
import SiteNav from "../components/SiteNav"
import SEO from "../components/seo"
import renderAst from "../utils/AFMRehype"

const MarkdownTemplate = props => {
  const { file } = props.data
  const { modifiedTime, relativePath, childMarkdownRemark } = file
  const { htmlAst, tableOfContents, timeToRead } = childMarkdownRemark

  const gitRemote = props.pageContext.gitRemote

  /*
.parent {
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
}

.div1 { grid-area: 1 / 1 / 3 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 1 / 3 / 2 / 4; }
.div4 { grid-area: 2 / 2 / 3 / 4; }
*/

  return (
    <DocLayout>
      <SEO title={props.pageContext.seo} />
      <div
        css={css`
          display: grid;
          grid-template-columns: minmax(280px, 280px) repeat(11, 1fr);
          grid-template-rows: 1fr 30px
          grid-column-gap: 0px;
          grid-row-gap: 0px;
        `}
      >
        <div
          css={css`
            grid-area: 1 / 1 / 2 / 2;
          `}
          className="spectrum--light"
        >
          <SiteNav
            currentPage={props.location.pathname}
            gitRemote={gitRemote}
          />
        </div>
        <div
          css={css`
            grid-area: 1 / 2 / 2 / 11;
            padding-top: 30px;
            padding-left: 16px;
            padding-right: 16px;
          `}
        >
          {renderAst(htmlAst)}
        </div>
        <div
          css={css`
            grid-area: 1 / 11 / 2 / 13;
            padding-top: 30px;
            padding-left: 16px;
            padding-right: 16px;
          `}
        >
          <div
            css={css`
              padding-bottom: 20px;
            `}
          >
            {gitRemote !== null ? (
              <Feedback
                gitUrl={`${gitRemote.protocol}://${gitRemote.resource}/${gitRemote.full_name}`}
                filePath={relativePath}
                branch={gitRemote.ref}
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <Heading variant="subtitle3">On this page</Heading>
            <span
              className="toc"
              dangerouslySetInnerHTML={{ __html: tableOfContents }}
            ></span>
          </div>
          <p>
            <span
              css={css`
                display: block;
              `}
            >
              Last update: {modifiedTime}
            </span>
            <span
              css={css`
                display: block;
              `}
            >
              {timeToRead} min read
            </span>
          </p>
        </div>
      </div>
      <div
        css={css`
          grid-area: 2 / 3 / 3 / 13;
        `}
      >
        <Footer />
      </div>
    </DocLayout>
  )
}

export default MarkdownTemplate

export const query = graphql`
  query MarkdownTemplateQuery($id: String!) {
    file(id: { eq: $id }) {
      id
      modifiedTime(formatString: "YYYY-MM-DD")
      name
      relativePath
      childMarkdownRemark {
        htmlAst
        tableOfContents
        timeToRead
      }
    }
  }
`
