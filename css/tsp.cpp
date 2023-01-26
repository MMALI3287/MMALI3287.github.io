#include <iostream>
#include <vector>
using namespace std;

const int INF = 1e9;
int n;
vector<vector<int>> dist;
vector<int> path;
int bestCost = INF;
vector<int> bestPath;

// Function to calculate lower bound of the remaining cost of a path
int lowerBound(vector<int> &path)
{
    // Create a vector to store visited cities
    vector<bool> visited(n, false);
    for (int i = 0; i < path.size(); i++)
    {
        visited[path[i]] = true;
    }
    // Initialize lower bound to 0
    int lb = 0;
    // Add the smallest edge from the current city to a non-visited city
    for (int i = 0; i < path.size(); i++)
    {
        int minDist = INF;
        for (int j = 0; j < n; j++)
        {
            if (!visited[j])
            {
                minDist = min(minDist, dist[path[i]][j]);
            }
        }
        lb += minDist;
    }
    // Add the smallest edge from a non-visited city to the starting city
    int start = path[0];
    int minDist = INF;
    for (int i = 0; i < n; i++)
    {
        if (!visited[i])
        {
            minDist = min(minDist, dist[i][start]);
        }
    }
    lb += minDist;
    return lb;
}

// Function to check if a path is complete
bool isComplete(vector<int> &path)
{
    return path.size() == n;
}

// Function to calculate the cost of a path
int pathCost(vector<int> &path)
{
    int cost = 0;
    for (int i = 0; i < path.size() - 1; i++)
    {
        cost += dist[path[i]][path[i + 1]];
    }
    cost += dist[path[path.size() - 1]][path[0]];
    return cost;
}

// Recursive function to find the optimal path
void tsp(vector<int> &path, int cost)
{
    // Check if path is complete
    if (isComplete(path))
    {
        // Update best path and cost if this path is better
        if (cost < bestCost)
        {
            bestCost = cost;
            bestPath = path;
        }
        return;
    }
    // Generate subproblems by adding a new city to the path
    for (int i = 0; i < n; i++)
    {
        // Check if city is not already in the path
        if (find(path.begin(), path.end(), i) == path.end())
        {
            // Calculate lower bound of remaining cost
            int lb = lowerBound(path);
            // Check if this path can lead to a better solution
            if (cost + lb < bestCost)
            {
                // Add new city to the path
                path.push_back(i);
                // Recursively find the optimal path
                tsp(path, cost + dist[path[path.size() - 2]][i]);
                // Remove the last city from the path
                path.pop_back();
            }
        }
    }
}

int main()
{
    cin >> n;
    dist.resize(n, vector<int>(n));
    // Input distance matrix
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cin >> dist[i][j];
        }
    }
    // Start with an empty path and 0 cost
    path.push_back(0);
    tsp(path, 0);
    // Print the best path and cost
    for (int i = 0; i < bestPath.size(); i++)
    {
        cout << bestPath[i] << " ";
    }
    cout << endl
         << bestCost << endl;
    return 0;
}
