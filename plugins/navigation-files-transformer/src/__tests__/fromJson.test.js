const fromJson = require("../fromJson")

test("manifest-docs.json content", () => {
  const fileContent = `
{
  "name": "Parliament Site",
  "version": "1.0.0",
  "description": "Onboarding docs for Parliament",
  "author": "DevRel Team",
  "view_type": "mdbook",
  "meta_keywords": "adobe, parliament",
  "meta_description": "default description",
  "publish_date": "30/08/2018",
  "show_edit_github_banner": false,
  "base_path": "https://raw.githubusercontent.com",
  "pages": [
    {
      "importedFileName": "readme",
      "pages": [
        {
          "importedFileName": "onboarding",
          "pages": [],
          "path": "DevRel/parliament-docs/master/onboarding.md",
          "title": "Onboarding"
        }
      ],
      "path": "DevRel/parliament-docs/master/README.md",
      "title": "Overview"
    },
    {
      "importedFileName": "contributing",
      "pages": [
      ],
      "path": "DevRel/parliament-docs/master/.github/CONTRIBUTING.md",
      "title": "Contributing"
    }
  ]
}
`
    const parsedContent = fromJson(fileContent);

    expect(parsedContent).toMatchSnapshot();
})