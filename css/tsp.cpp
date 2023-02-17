#include <bits/stdc++.h>
using namespace std;

int n;

vector<vector<int>> findTSPSolution(vector<vector<int>> matrix)
{
    vector<int> path;
    int source = 0;
    path.push_back(source);

    priority_queue<pair<pair<int, vector<vector<int>>>, vector<int>>, vector<pair<pair<int, vector<vector<int>>>, vector<int>>>, greater<pair<pair<int, vector<vector<int>>>, vector<int>>>> pq;
    pq.push({{0, matrix}, path});

    while (!pq.empty())
    {
        auto t = pq.top();
        pq.pop();
        int cost = t.first.first;
        matrix = t.first.second;
        path = t.second;

        int i = path[path.size() - 1];

        if (path.size() == n)
        {
            if (matrix[i][source] != 0)
            {
                path.push_back(source);
                cost += matrix[i][source];
                return path;
            }
        }

        for (int j = 0; j < n; j++)
        {
            if (matrix[i][j] != 0 && find(path.begin(), path.end(), j) == path.end())
            {
                auto newMatrix = matrix;
                for (int k = 0; k < n; k++)
                {
                    newMatrix[i][k] = newMatrix[k][i] = 0;
                }

                auto newPath = path;
                newPath.push_back(j);
                pq.push({{cost + matrix[i][j], newMatrix}, newPath});
            }
        }
    }
    return vector<vector<int>>();
}

int main()
{
    cin >> n;
    vector<vector<int>> matrix(n, vector<int>(n));
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cin >> matrix[i][j];
        }
    }

    auto result = findTSPSolution(matrix);
    for (int i = 0; i < result.size(); i++)
    {
        cout << result[i] << " ";
    }
    cout << endl;
    return 0;
}
