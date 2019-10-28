import React from "react"
import { Link } from "gatsby"
import Heading from "@react/react-spectrum/Heading"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Item = ({ name, url, children }) => (
  <li>
    {!children ? <Link to={url}>{name}</Link> : name}
    {children}
  </li>
)

const nav = data => {
  const subnav = children => {
    if (children) {
      return <ul>{nav(children)}</ul>
    }
  }

  return data.map((node, index) => {
    console.log(node)
    return (
      <Item key={node.id} name={node.label} url={node.url}>
        {subnav(node.children)}
      </Item>
    )
  })
}

const IndexPage = ({ data }) => {
  const siteInfo = data.rawGatsbySourceGitJson
  const pages = siteInfo.pages
  return (
    <Layout>
      <SEO title="Home" />
      <Heading variant="pageTitle">{siteInfo.title}</Heading>
      {nav(pages)}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    rawGatsbySourceGitJson {
      title
      pages
    }
  }
`
