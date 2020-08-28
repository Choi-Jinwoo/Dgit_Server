import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { GraphQLClient, gql } from "graphql-request"
import axios, { AxiosResponse } from 'axios';

import config from 'src/config';
import { IGithubUser, IGithubContribution } from 'src/interface/github/githubUser.interface';

const graphQLClient = new GraphQLClient(config.GITHUB.GQL.URL, {
  headers: {
    authorization: `token ${config.GITHUB.TOKEN}`,
  },
});

@Injectable()
// FIXME: 함수 분해 필요(요청, 응답)
export class GithubLib {

  async getGithubUser(userID: string): Promise<IGithubUser | null> {
    try {
      const response: AxiosResponse = await axios.get(`${config.GITHUB.REST.URL}/users/${userID}`);
      return response.data;
    } catch (err) {
      if (err.response.status === HttpStatus.NOT_FOUND) {
        return null;
      }

      throw err;
    }
  }

  async getContributionByUser(userID: string): Promise<IGithubContribution> {
    const query = gql`
      query getContribution($login: String!) {
      user(login: $login) {
        login
        avatarUrl
        bio
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
    `

    try {
      const data = await graphQLClient.request(query, {
        login: userID,
      });

      return data;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  // FIXME: return 타입 변경필요
  async getGithubUserDetailInfoByUser(userID: string): Promise<IGithubContribution | null> {
    const query = gql`
      query getContribution($login: String!) {
      user(login: $login) {
        login
        avatarUrl
        bio
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
    `

    try {
      const data = await graphQLClient.request(query, {
        login: userID,
      });

      return data;
    } catch (err) {
      Logger.error(err.message);
      return null;
      // throw err;
    }
  }
}
