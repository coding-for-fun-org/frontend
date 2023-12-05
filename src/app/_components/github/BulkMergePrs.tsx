"use client";

import { signIn, signOut } from "next-auth/react";
import { type FC, useEffect, useState } from "react";
import { useOctokit } from "@/hooks/useOctokit";

type TGithubPullRequest = {
  state: string;
  number: number;
  title: string;
};
type TGithubPullRequestGroup = {
  org: string;
  repo: string;
  pulls: TGithubPullRequest[];
};

export const BulkMergePrs: FC = () => {
  const octokit = useOctokit();
  const [githubPullRequestGroup, setGithubPullRequestGroup] =
    useState<TGithubPullRequestGroup[]>();

  console.log("githubPullRequestGroup", githubPullRequestGroup);

  useEffect(() => {
    if (!octokit) {
      return;
    }

    octokit
      .request("GET /user/orgs")
      .then((response) => response.data)
      .then((orgs) =>
        Promise.all(
          orgs.map((org) =>
            octokit
              .request(`GET /orgs/{org}/repos`, {
                org: org.login,
              })
              .then((response) => ({
                org: org.login,
                repos: response.data,
              })),
          ),
        ),
      )
      .then((reposByOrgs) =>
        Promise.all(
          reposByOrgs.flatMap((reposByOrg) =>
            reposByOrg.repos.map((repo) =>
              octokit
                .request("GET /repos/{owner}/{repo}/pulls", {
                  owner: reposByOrg.org,
                  repo: repo.name,
                })
                .then((response) => ({
                  org: reposByOrg.org,
                  repo: repo.name,
                  pulls: response.data.map((pull) => ({
                    state: pull.state,
                    number: pull.number,
                    title: pull.title,
                  })),
                })),
            ),
          ),
        ),
      )
      .then((result) => {
        setGithubPullRequestGroup(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div>
      <button
        className="bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => {
          signIn("github", { callbackUrl: "/github" }).catch(console.error);
        }}
      >
        log in
      </button>
      <button
        className="ml-2 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => {
          signOut({ callbackUrl: "/github" }).catch(console.error);
        }}
      >
        log out
      </button>

      <ul>
        <li>list here</li>
      </ul>
    </div>
  );
};
